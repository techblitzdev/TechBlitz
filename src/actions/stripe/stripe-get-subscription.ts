'use server';
import { Subscription } from '@/types/Subscription';
import { prisma } from '@/utils/prisma';

export const getSubscription = async (opts: {
  userUid: string;
}): Promise<Subscription | null> => {
  const { userUid } = opts;

  if (!userUid) return null;

  // get the user from the db

  //@ts-ignore
  return await prisma.subscriptions.findUnique({
    where: {
      userUid,
    },
  });
};
