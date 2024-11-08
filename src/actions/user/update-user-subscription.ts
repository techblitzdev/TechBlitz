'use server';
import type {
  CreateSubscriptionInput,
  Subscription,
} from '@/types/Subscription';
import { getUserFromSession } from './get-user';
import { prisma } from '@/utils/prisma';
import { stripe } from '@/lib/stripe';

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

    // get the subscription and customer id from the db
    const { stripeCustomerId, stripeSubscriptionId } = existingSubscription;
    if (!stripeCustomerId || !stripeSubscriptionId) {
      return {
        success: false,
        error: 'Stripe customer or subscription ID not found',
      };
    }

    // retrieve the subscription from Stripe
    const stripeSubscription = await stripe.subscriptions.retrieve(
      stripeSubscriptionId
    );
    if (!stripeSubscription) {
      return {
        success: false,
        error: 'Stripe subscription not found',
      };
    }

    // update the subscription in stripe
    await stripe.subscriptions.update(stripeSubscriptionId, {
      items: [
        {
          id: stripeSubscriptionId,
          deleted: true,
        },
        {
          price: stripeSubscription.items.data[0].price.id,
        },
      ],
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
        stripeCustomerId: subscription.stripeCustomerId,
        stripeSubscriptionId: subscription.stripeSubscriptionId,
      },
    });

    return {
      success: true,
      subscription: newSubscription,
    };
  }
};
