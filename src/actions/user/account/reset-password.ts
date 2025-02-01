'use server'
import { supabase } from '@/lib/supabase'

export const resetPassword = async (opts: { email: string }) => {
  const { email } = opts

  // we handle the redirect in the edge function
  const { data, error } = await supabase.auth.resetPasswordForEmail(email)

  if (error) {
    throw error
  }

  return data
}
