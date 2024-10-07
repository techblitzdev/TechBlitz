'use server';
import { createClient as createServerClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { prisma } from '@/utils/prisma';
import { User } from '@/types/User';
import { revalidateTag } from 'next/cache';

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
  userUid: string
): Promise<Omit<User, 'answers'> | null> => {
  if (!userUid) return null;
  const user = (await prisma.users.findUnique({
    where: {
      uid: userUid,
    },
  })) as Omit<User, 'answers'> | null;

  revalidateTag(`user-${userUid}`);

  return user;
};
