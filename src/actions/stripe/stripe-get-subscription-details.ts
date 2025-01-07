'use server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

export const getSubscriptionDetails = async (userUid: string) => {
  const subscriptionId = await prisma.subscriptions.findFirst({
    where: {
      userUid,
    },
    select: {
      stripeSubscriptionId: true,
    },
  });

  if (!subscriptionId?.stripeSubscriptionId) {
    return null;
  }

  return await stripe.subscriptions.retrieve(
    subscriptionId.stripeSubscriptionId,
    {
      expand: ['latest_invoice.payment_intent'],
    }
  );
};
