import Stripe from 'stripe';

export const stripe = new Stripe(process.env.NEXT_PRIVATE_STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-01-27.acacia',
});
