'use server';
import { prisma } from '@/utils/prisma';
import { stripe } from '@/lib/stripe';

/**
 * Cancels a user's subscription at the end of the billing period
 *
 * @param opts
 */
export const cancelSubscription = async (opts: { userUid: string }) => {
  const { userUid } = opts;

  console.log({
    userUid
  });

  // get the user's subscription
  const userSubscription = await prisma.subscriptions.findUnique({
    where: {
      userUid
    }
  });

  console.log({
    userSubscription
  });

  if (!userSubscription) {
    throw new Error('User does not have an active subscription');
  }

  const { stripeSubscriptionId } = userSubscription;
  if (!stripeSubscriptionId) {
    throw new Error('User does not have an active subscription');
  }

  // cancel the subscription
  await stripe.subscriptions.update(stripeSubscriptionId, {
    cancel_at_period_end: true
  });
};
