import * as ldap from 'ldapjs'
import { createAdminClient } from './supabase/admin'

export interface LdapUser {
  username: string
  email: string
  dn: string
}

async function getLdapSettings() {
  try {
    const supabase = createAdminClient()
    const { data } = await supabase
      .from('_app_settings')
      .select('key, value')
      .in('key', ['ldap_enabled', 'ldap_host', 'ldap_port', 'ldap_secure', 'ldap_bind_dn', 'ldap_bind_password', 'ldap_search_base', 'ldap_username_attribute', 'ldap_email_attribute'])
    
    if (data && data.length > 0) {
      const settings = data.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {} as Record<string, string>)
      
      return {
        enabled: settings.ldap_enabled === 'true',
        host: settings.ldap_host || 'csigroups.com',
        port: settings.ldap_port || '389',
        secure: settings.ldap_secure === 'true',
        bindDn: settings.ldap_bind_dn || '',
        bindPassword: settings.ldap_bind_password || '',
        searchBase: settings.ldap_search_base || 'DC=csigroups,DC=com',
        usernameAttr: settings.ldap_username_attribute || 'sAMAccountName',
        emailAttr: settings.ldap_email_attribute || 'mail'
      }
    }
  } catch (error) {
    console.error('[LDAP] Failed to load settings from database:', error)
  }
  
  return {
    enabled: false,
    host: 'csigroups.com',
    port: '389',
    secure: false,
    bindDn: '',
    bindPassword: '',
    searchBase: 'DC=csigroups,DC=com',
    usernameAttr: 'sAMAccountName',
    emailAttr: 'mail'
  }
}

export async function authenticateLdapUser(username: string, password: string): Promise<LdapUser | null> {
  const config = await getLdapSettings()
  
  if (!config.enabled) {
    return null
  }

  return new Promise((resolve) => {
    let client: any
    let timeoutId: NodeJS.Timeout

    const cleanup = () => {
      console.log('[LDAP] Cleanup called')
      if (timeoutId) clearTimeout(timeoutId)
      if (client) {
        try {
          client.unbind(() => {})
        } catch (e) {
          console.error('[LDAP] Cleanup unbind error:', e)
        }
      }
    }

    // Set overall timeout
    timeoutId = setTimeout(() => {
      console.error('[LDAP] Authentication timeout after 15s')
      cleanup()
      resolve(null)
    }, 15000)

    try {
      const protocol = config.secure ? 'ldaps' : 'ldap'
      const url = `${protocol}://${config.host}:${config.port}`
      console.log('[LDAP] Creating client with URL:', url)

      // Enhanced TLS options for HTTPS deployment
      const tlsOptions: Record<string, unknown> = {
        rejectUnauthorized: process.env.LDAP_REJECT_UNAUTHORIZED !== 'false', // Default to true for security
        minVersion: 'TLSv1.2',
        maxVersion: 'TLSv1.3',
        ciphers: 'HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA'
      }

      // Add CA certificates if provided
      if (process.env.LDAP_CA_CERT) {
        tlsOptions.ca = [process.env.LDAP_CA_CERT]
      }

      client = ldap.createClient({
        url: url,
        timeout: 30000, // Increased timeout for HTTPS
        connectTimeout: 20000, // Increased connect timeout
        reconnect: false,
        tlsOptions: tlsOptions,
        // Additional options for production
        idleTimeout: 30000
      })

      console.log('[LDAP] Client created successfully')

      client.on('error', (err: Error) => {
        console.error('[LDAP] Client error event:', err)
        console.error('[LDAP] Error stack:', err.stack)
        console.error('[LDAP] Error details:', JSON.stringify(err, null, 2))
        cleanup()
        resolve(null)
      })

      client.on('connect', () => {
        console.log('[LDAP] Connected to server successfully')
      })

      client.on('close', () => {
        console.log('[LDAP] Connection closed')
      })

      client.on('timeout', () => {
        console.error('[LDAP] Connection timeout')
      })
    } catch (err) {
      console.error('[LDAP] Client creation error:', err)
      console.error('[LDAP] Error stack:', err instanceof Error ? err.stack : 'No stack')
      cleanup()
      resolve(null)
      return
    }

    // First bind with service account to search for user
    console.log('[LDAP] Attempting bind with DN:', config.bindDn)

    client.bind(config.bindDn, config.bindPassword, (err: Error | null) => {
      if (err) {
        console.error('[LDAP] Bind error:', err)
        console.error('[LDAP] Bind error stack:', err.stack)
        cleanup()
        resolve(null)
        return
      }

      console.log('[LDAP] Bind successful')

      // Search for the user - try multiple search bases
      const searchBases = [
        'OU=Users CSIGROUPS (Normal),DC=CSIGROUPS,DC=COM',
        'DC=CSIGROUPS,DC=COM',
        config.searchBase
      ]

      const trySearch = (baseIndex: number) => {
        if (baseIndex >= searchBases.length) {
          console.log('[LDAP] All search bases exhausted')
          cleanup()
          resolve(null)
          return
        }

        const searchBase = searchBases[baseIndex]
        
        const searchOptions = {
          filter: `(${config.usernameAttr}=${username})`,
          scope: 'sub' as const,
          attributes: [config.usernameAttr, config.emailAttr, 'dn'],
          sizeLimit: 1,
        }

        console.log(`[LDAP] Searching with base [${baseIndex}]:`, searchBase)
        console.log('[LDAP] Search filter:', searchOptions.filter)

        client.search(searchBase, searchOptions, (err: Error | null, res: any) => {
          if (err) {
            console.error(`[LDAP] Search error on base [${baseIndex}]:`, err)
            trySearch(baseIndex + 1)
            return
          }

          console.log('[LDAP] Search initiated successfully')

          let userEntry: ldap.SearchEntry | null = null
          let entryCount = 0

          res.on('searchEntry', (entry: ldap.SearchEntry) => {
            entryCount++
            console.log('[LDAP] Search entry found #' + entryCount)
            console.log('[LDAP] Entry DN:', entry.dn?.toString())
            userEntry = entry
          })

          res.on('searchReference', (referral: any) => {
            console.log('[LDAP] Search referral:', referral)
          })

          res.on('end', () => {
            console.log(`[LDAP] Search ended on base [${baseIndex}], user found:`, !!userEntry)

            if (!userEntry) {
              console.log('[LDAP] No user entry found, trying next base')
              trySearch(baseIndex + 1)
              return
            }

            const userDn = userEntry.dn.toString()
            const attributes = userEntry.attributes

            const emailObj = attributes.find((attr: any) =>
              attr.type && typeof attr.type === 'string' &&
              attr.type.toLowerCase() === config.emailAttr.toLowerCase()
            )
            const email = emailObj?.vals?.[0]?.toString()

            console.log('[LDAP] User DN:', userDn)
            console.log('[LDAP] User email:', email)

            // Now try to bind with the user's credentials
            console.log('[LDAP] Creating user client for authentication')

            const protocol = config.secure ? 'ldaps' : 'ldap'
            const userClient = ldap.createClient({
              url: `${protocol}://${config.host}:${config.port}`,
              timeout: 10000,
              connectTimeout: 10000,
              reconnect: false,
              tlsOptions: { rejectUnauthorized: false }
            })

            userClient.on('error', (err: Error) => {
              console.error('[LDAP] User client error:', err)
              try { userClient.unbind() } catch (e) { }
              cleanup()
              resolve(null)
            })

            console.log('[LDAP] Attempting user bind')

            userClient.bind(userDn, password, (err: Error | null) => {
              try { userClient.unbind() } catch (e) { }
              cleanup()

              if (err) {
                console.error('[LDAP] User bind error:', err)
                console.error('[LDAP] User bind error stack:', err.stack)
                resolve(null)
              } else {
                console.log('[LDAP] User authentication successful')
                resolve({
                  username,
                  email: email || '',
                  dn: userDn,
                })
              }
            })
          })

          res.on('error', (err: Error) => {
            console.error(`[LDAP] Search response error on base [${baseIndex}]:`, err)
            trySearch(baseIndex + 1)
          })
        })
      }

      trySearch(0)
    })
  })
}
