import Stripe from 'stripe';
import { prisma } from '@/utils/prisma';

export async function checkoutSessionCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;

  // get the price id so we can
}
