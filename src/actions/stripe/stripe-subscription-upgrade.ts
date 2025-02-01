'use server';
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
