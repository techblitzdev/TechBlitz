'use server';
import type {
  CreateSubscriptionInput,
  Subscription,
} from '@/types/Subscription';
import { getUserFromSession } from './get-user';
import { prisma } from '@/utils/prisma';
import { stripe } from '@/lib/stripe';
import { PRICING_PLANS } from '@/utils/constants/pricing';

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
    // get the subscription and customer id from the db
    const {
      stripeCustomerId: oldStripeCustomerId,
      stripeSubscriptionId: oldStripeSubscriptionId,
    } = existingSubscription;
    if (!oldStripeCustomerId || !oldStripeSubscriptionId) {
      return {
        success: false,
        error: 'Stripe customer or subscription ID not found',
      };
    }

    // immediately cancel the old subscription
    const oldStripeSubscription = await stripe.subscriptions.cancel(
      oldStripeSubscriptionId
    );

    if (!oldStripeSubscription) {
      return {
        success: false,
        error: 'Stripe subscription not found',
      };
    }

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

    // update the user object based on which plan was chosen

    // find the user's plan name
    const plan = PRICING_PLANS.find((p) => p.uid === subscription.productId);

    if (!plan) {
      return {
        success: false,
        error: 'Plan not found',
      };
    }

    // update the user level
    await prisma.users.update({
      where: {
        uid: userUid,
      },
      data: {
        userLevel: plan.value,
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
        stripeCustomerId: subscription.stripeCustomerId,
        stripeSubscriptionId: subscription.stripeSubscriptionId,
      },
    });

    // find the user's plan name
    const plan = PRICING_PLANS.find((p) => p.uid === newSubscription.productId);

    console.log({
      plan,
    });

    if (!plan) {
      return {
        success: false,
        error: 'Plan not found',
      };
    }

    // update the user level
    await prisma.users.update({
      where: {
        uid: userUid,
      },
      data: {
        userLevel: plan.value,
      },
    });

    return {
      success: true,
      subscription: newSubscription,
    };
  }
};
