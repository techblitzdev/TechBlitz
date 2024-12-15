'use server';
import { UserUpdatePayload } from '@/types/User';
import { prisma } from '@/utils/prisma';
import { revalidateTag } from 'next/cache';
import { getUserFromSession } from './get-user';

export const updateUser = async (opts: {
  userDetails: Partial<UserUpdatePayload>;
}) => {
  const { userDetails } = opts;

  if (!userDetails) {
    throw new Error('User data is required');
  }

  // go and get the user details from the db
  const { data } = await getUserFromSession();

  await prisma.users.update({
    where: {
      uid: data?.user?.id
    },
    data: userDetails
  });

  revalidateTag('user-details');

  return 'ok';
};
