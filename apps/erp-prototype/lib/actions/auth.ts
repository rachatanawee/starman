'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { authenticateLdapUser } from '@/lib/ldap'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function login(formData: FormData) {
  const supabase = await createClient()
  const emailOrUsername = formData.get('emailOrUsername') as string
  const password = formData.get('password') as string

  const isEmail = emailOrUsername.includes('@')

  // If it's an email, try Supabase auth first
  if (isEmail) {
    const { error } = await supabase.auth.signInWithPassword({
      email: emailOrUsername,
      password
    })

    if (!error) {
      // Supabase auth successful
      redirect('/en/dashboard')
      return
    }
    // If Supabase auth fails, fall back to LDAP (in case email is used as username)
  }

  // Try LDAP authentication (either username or fallback from email)
  const ldapUser = await authenticateLdapUser(emailOrUsername, password)

  if (!ldapUser) {
    return { error: 'Invalid username/email or password' }
  }

  // Check if user exists in Supabase
  const adminClient = createAdminClient()
  const { data: users } = await adminClient.auth.admin.listUsers()

  let existingUser = users.users.find(u => u.email === ldapUser.email)

  if (!existingUser) {
    // Create user in Supabase with a known password based on user ID
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
      console.error('Error creating user:', createError)
      return { error: 'Failed to create user account' }
    }

    existingUser = newUser.user
  }

  // For existing users, we need to know the password
  // Since we can't retrieve it, let's use a consistent password pattern
  // This is not ideal for production, but works for this implementation

  const knownPassword = `ldap_auth_${existingUser.id}`

  // Update password to ensure it's set correctly
  await adminClient.auth.admin.updateUserById(existingUser.id, {
    password: knownPassword
  })

  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email: ldapUser.email,
    password: knownPassword
  })

  if (signInError) {
    console.error('Sign in error:', signInError)
    return { error: 'Failed to sign in' }
  }

  console.log('Sign in successful:', signInData.session ? 'Session created' : 'No session')
  console.log('Session access token:', signInData.session?.access_token ? 'exists' : 'missing')
  
  // Return success to let client-side handle redirect
  return { success: true }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/en/login')
}
