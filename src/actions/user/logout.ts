'use server';

import { supabase } from '@/lib/supabase';

/**
 * Method to log the user out of their account
 */
export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
  return 'ok';
};
