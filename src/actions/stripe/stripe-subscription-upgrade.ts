'use server';
import { prisma } from '@/utils/prisma';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';

export const upgradeUserSubscription = async (opts: {
  currentSubscriptionId: string;
  newPriceId: string;
}) => {
  const { currentSubscriptionId, newPriceId } = opts;

  await stripe.subscriptions.update(currentSubscriptionId, {
    items: [
      {
        id: currentSubscriptionId,
        deleted: true,
      },
      {
        price: newPriceId,
      },
    ],
  });
};
