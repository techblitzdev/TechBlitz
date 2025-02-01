'use server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

export const getUserInvoices = async (userUid: string) => {
  // get the user's subscripton object
  const subscription = await prisma.subscriptions.findFirst({
    where: {
      userUid,
    },
  });

  if (!subscription) {
    return [];
  }

  const stripeCustomerId = subscription.stripeCustomerId;
  if (!stripeCustomerId) {
    return [];
  }

  const invoices = await stripe.invoices.list({
    customer: stripeCustomerId,
    limit: 10,
  });

  return invoices.data;
};
