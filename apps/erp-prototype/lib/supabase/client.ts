import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return document.cookie
            .split('; ')
            .find(row => row.startsWith(`${name}=`))
            ?.split('=')[1]
        },
        set(name: string, value: string, options?: { maxAge?: number; path?: string }) {
          // Ensure cookies work properly through reverse proxy with browser compatibility
          const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
          const isHttps = window.location.protocol === 'https:'
          const cookieOptions = `path=${basePath || '/'}; max-age=${options?.maxAge || 31536000}; SameSite=lax${isHttps ? '; Secure' : ''}`

          try {
            document.cookie = `${name}=${value}; ${cookieOptions}`
          } catch (error) {
            console.warn('Failed to set cookie:', error)
          }
        },
        remove(name: string) {
          const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
          try {
            document.cookie = `${name}=; path=${basePath || '/'}; max-age=0`
          } catch (error) {
            console.warn('Failed to remove cookie:', error)
          }
        },
      },
      global: {
        headers: {
          'X-Client-Info': 'crm-prediction-client'
        }
      }
    }
  )

  return client
}
