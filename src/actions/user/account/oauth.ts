'use server';
import { supabase } from '@/lib/supabase';
import { redirect } from 'next/navigation';

export const signInWithGithub = async () => {
  const callbackUrl = new URL('/auth/callback', process.env.NEXT_PUBLIC_URL);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: callbackUrl.toString()
    }
  });

  if (error) throw new Error(error.message);

  redirect(`${data.url}/dashboard`);
};

export const signInWithDiscord = async () => {
  const callbackUrl = new URL('/auth/callback', process.env.NEXT_PUBLIC_URL);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo: callbackUrl.toString()
    }
  });

  if (error) throw new Error(error.message);

  redirect(`${data.url}/dashboard`);
};
