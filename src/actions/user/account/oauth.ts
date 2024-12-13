'use server';
import { createClient } from '@/utils/supabase/server';
import { Provider } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

export const oauth = async (provider: Provider) => {
  const supabase = await createClient();

  const callbackUrl = new URL('/auth/callback', process.env.NEXT_PUBLIC_URL);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: callbackUrl.toString()
    }
  });

  if (error) throw new Error(error.message);

  redirect(data.url);
};
