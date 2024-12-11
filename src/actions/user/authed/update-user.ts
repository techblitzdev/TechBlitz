'use server';
import { UserUpdatePayload } from '@/types/User';
import { prisma } from '@/utils/prisma';
import { revalidateTag } from 'next/cache';

export const updateUser = async (opts: {
  userDetails: Partial<UserUpdatePayload>;
}) => {
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

  revalidateTag('user-details');

  return 'ok';
};
