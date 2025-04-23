'use server';
import { createClient as createServerClient } from '@/utils/supabase/server';
import { prisma } from '@/lib/prisma';
import type { UserRecord } from '@/types';
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

export const getUserFromDb = async (userUid: string): Promise<UserRecord | null> => {
  if (!userUid) return null;
  const user = await prisma.users.findUnique({
    where: {
      uid: userUid,
    },
    include: {
      studyPathEnrollments: {
        include: {
          studyPath: true,
        },
      },
    },
  });

  revalidateTag('user-details');

  if (!user) return null;

  return {
    ...user,
    codeEditorTheme: user.codeEditorTheme || undefined,
    timeSpendingPerDay: user.timeSpendingPerDay || 'LESS_THAN_5_MINUTES',
    hasSent7DayNoChallengeEmail: user.hasSent7DayNoChallengeEmail || false,
  };
};

/**
 * Method to get the user from the session, then return
 * the user's details from the database.
 *
 * We use this when we need to validate the user and their
 * permissions on the server, and cannot trust the client
 * to send the correct user details.
 *
 * @returns UserRecord | null
 */
export const getUser = async (userUid?: string) => {
  const { data } = await getUserFromSession();
  if (!data?.user?.id) return null;
  return await getUserFromDb(userUid || data.user.id);
};
