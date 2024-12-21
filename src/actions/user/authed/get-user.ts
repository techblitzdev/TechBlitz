'use server';
import { createClient as createServerClient } from '@/utils/supabase/server';
import { prisma } from '@/utils/prisma';
import { UserRecord } from '@/types/User';
import { revalidateTag } from 'next/cache';

/**
 * Get the user from the server - used in api routes, server componets & server actions
 *
 * @returns User | null
 */
export const getUserFromSession = async () => {
  const supabase = await createServerClient();
  return await supabase?.auth?.getUser();
};

export const getUserFromDb = async (
  userUid: string
): Promise<UserRecord | null> => {
  if (!userUid) return null;
  const user = await prisma.users.findUnique({
    where: {
      uid: userUid,
    },
  });

  revalidateTag('user-details');

  return user;
};
