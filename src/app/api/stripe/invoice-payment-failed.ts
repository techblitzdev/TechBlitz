import Stripe from 'stripe';
import { prisma } from '@/utils/prisma';
import { resend } from '@/lib/resend';
import { stripe } from '@/lib/stripe';

/**
 * Method is ran on the following events:
 * - invoice.payment_failed
 */
export const invoicePaymentFailed = async (event: Stripe.Event) => {
  const invoice = event.data.object as Stripe.Invoice;

  // get the customer email
  const customer = await stripe.customers.retrieve(invoice.customer as string);
  const userEmail = (customer as Stripe.Customer).email;

  console.log('userEmail', userEmail);

  if (!userEmail) {
    console.log('No user email found');
    return;
  }

  // find the user via their email they have entered in the checkout session
  const user = await prisma.users.findFirst({
    where: {
      OR: [{ email: userEmail }, { stripeEmails: { has: userEmail } }],
    },
  });

  // we need the user in order to update their details
  if (!user) {
    console.log('No user found');
    return;
  }

  const userUid = user.uid;

  // update the user's userLevel to 'FREE'
  await prisma.users.update({
    where: {
      uid: userUid,
    },
    data: {
      userLevel: 'FREE',
    },
  });

  // update the user's subscription to inactive
  await prisma.subscriptions.update({
    where: {
      userUid: userUid,
    },
    data: {
      active: false,
      updatedAt: new Date(),
      stripeSubscriptionId: null,
      stripeCustomerId: null,
      stripeSubscriptionItemId: null,
      endDate: new Date(),
      productId: '',
    },
  });

  // send an email to the user to let them know their payment has failed
  await resend.emails.send({
    to: userEmail,
    subject: 'Payment Failed',
    text: 'Your payment has failed. Please update your payment information.',
    from: 'team@techblitz.dev',
  });

  return true;
};
