'use server'
import { createClient } from '@/utils/supabase/server'

/**
 * Method to log the user out of their account
 */
export const logout = async () => {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(error.message)
  }
  return 'ok'
}
