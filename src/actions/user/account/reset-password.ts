'use server';
import { supabase } from '@/lib/supabase';

const redirectTo = process.env.NEXT_PUBLIC_PASSWORD_RESET_REDIRECT_URL;

export const resetPassword = async (opts: { email: string }) => {
  const { email } = opts;

  // we handle the redirect in the edge function
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    throw error;
  }

  return data;
};
