'use server';
import { UserUpdatePayload } from '@/types/User';
import { prisma } from '@/utils/prisma';
import { unstable_cache as NextCache } from 'next/cache';

export const updateUser = NextCache(
  async (opts: { userDetails: Partial<UserUpdatePayload> }) => {
    const { userDetails } = opts;
    if (!userDetails) {
      throw new Error('User data is required');
    }

    await prisma.users.update({
      where: {
        uid: userDetails.uid,
      },
      data: userDetails,
    });
    return 'ok';
  }, 
  ['user-details']
);
