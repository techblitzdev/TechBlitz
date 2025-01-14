'use server';
import { prisma } from '@/lib/prisma';

/**
 * A migration script to add the isCustomUsername flag to users
 * who have a username.
 */
export const addIsCustomUsernameToUser = async () => {
  return await prisma.users.updateMany({
    where: {
      username: {
        not: null,
      },
    },
    data: { isCustomUsername: true },
  });
};
