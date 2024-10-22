'use server';
import type {
  CreateSubscriptionInput,
  Subscription,
} from '@/types/Subscription';
import { getUserFromSession } from './get-user';
import { prisma } from '@/utils/prisma';

type UpdateSubscriptionResponse = {
  success: boolean;
  subscription?: Subscription;
  error?: string;
};

export const updateUserSubscription = async (opts: {
  subscription: CreateSubscriptionInput;
}): Promise<UpdateSubscriptionResponse> => {
  const { subscription } = opts;

  // get the current user
  const { data } = await getUserFromSession();
  const userUid = data?.user?.id;
  if (!userUid) {
    return {
      success: false,
      error: 'User not found',
    };
  }

  // Check if user already has a subscription
  const existingSubscription = await prisma.subscriptions.findUnique({
    where: {
      userUid,
    },
  });

  if (existingSubscription) {
    // Update existing subscription
    const updatedSubscription = await prisma.subscriptions.update({
      where: {
        userUid,
      },
      data: {
        ...subscription,
        updatedAt: new Date(),
      },
    });

    return {
      success: true,
      subscription: updatedSubscription,
    };
  } else {
    // Create new subscription
    const newSubscription = await prisma.subscriptions.create({
      data: {
        ...subscription,
        userUid,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return {
      success: true,
      subscription: newSubscription,
    };
  }
};
