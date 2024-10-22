'use server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { unstable_cache } from 'next/cache';

/**
 * Retrieves all products from the stripe account.
 *
 * @param stripe
 * @returns
 */
export const getStripeProducts = unstable_cache(
  async (): Promise<Stripe.Product[]> => {
    //const stripe = await getStripe();

    if (!stripe) {
      throw new Error('Stripe is not initialized');
    }

    const products: Stripe.Response<Stripe.ApiList<Stripe.Product>> =
      await stripe.products.list({
        active: true,
        limit: 10,
      });

    if (!products) throw new Error('No products found');

    return products.data;
  }
);
