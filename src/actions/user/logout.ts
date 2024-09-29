'use server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

/**
 * Method to log the user out of their account
 */
export const logout = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
  return 'ok';
};
