'use server';
import { createClient as createServerClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { prisma } from '@/utils/prisma';
import { User } from '@/types/User';

/**
 * Get the user from the server - used in api routes, server componets & server actions
 *
 * @returns
 */
export const getUserFromSession = async () => {
  const cookieStore = cookies();
  const supabase = createServerClient(cookieStore);
  return supabase?.auth?.getUser();
};

export const getUserFromDb = async (
  userId: string
): Promise<Omit<User, 'answers'> | null> => {
  if (!userId) return null;
  return (await prisma.users.findUnique({
    where: {
      uid: userId,
    },
  })) as Omit<User, 'answers'> | null;
};
