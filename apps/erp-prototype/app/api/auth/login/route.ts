import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { authenticateLdapUser } from '@/lib/ldap'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { emailOrUsername, password } = await request.json()

  const isEmail = emailOrUsername.includes('@')
  const supabase = await createClient()

  if (isEmail) {
    const { error } = await supabase.auth.signInWithPassword({
      email: emailOrUsername,
      password
    })

    if (!error) {
      return NextResponse.json({ success: true })
    }
  }

  const ldapUser = await authenticateLdapUser(emailOrUsername, password)

  if (!ldapUser) {
    return NextResponse.json({ error: 'LDAP authentication failed. Please check your credentials or contact IT support.' }, { status: 401 })
  }

  const adminClient = createAdminClient()
  const { data: users } = await adminClient.auth.admin.listUsers()

  let existingUser = users.users.find(u => u.email === ldapUser.email)

  if (!existingUser) {
    const userId = crypto.randomUUID()
    const knownPassword = `ldap_auth_${userId}`

    const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
      email: ldapUser.email,
      password: knownPassword,
      email_confirm: true,
      user_metadata: {
        username: ldapUser.username,
        ldap_dn: ldapUser.dn,
        auth_method: 'ldap'
      }
    })

    if (createError) {
      return NextResponse.json({ error: 'Failed to create user account' }, { status: 500 })
    }

    existingUser = newUser.user
  }

  const knownPassword = `ldap_auth_${existingUser.id}`

  await adminClient.auth.admin.updateUserById(existingUser.id, {
    password: knownPassword
  })

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: ldapUser.email,
    password: knownPassword
  })

  if (signInError) {
    return NextResponse.json({ error: 'Failed to sign in' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
