'use server';
import { UserUpdatePayload } from '@/types/User';
import { prisma } from '@/utils/prisma';

export const updateUser = async (opts: { userDetails: UserUpdatePayload }) => {
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
};
