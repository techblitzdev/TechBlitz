'use server';
import { Subscription } from '@/types/Subscription';
import { prisma } from '@/utils/prisma';

export const getSubscription = async (opts: {
  userUid: string;
}): Promise<Subscription | null> => {
  const { userUid } = opts;
  if (!userUid) {
    throw new Error('User UID is required');
  }

  // get the user from the db
  return await prisma.subscriptions.findUnique({
    where: {
      userUid,
    },
  });
};
