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

/**
 * @description Method to get a plan via it's id
 * @param planId - The id of the plan you want to get the data for
 */
export const getPlanById = unstable_cache(async (planId: string) => {
  // grab all of the products, doesn't matter if it's monthly or yearly
  const products = await getStripeProducts();
  if (!products) throw new Error('No products found');

  // find the plan
  const plan = products.find((product) => product.id === planId);
  if (!plan) throw new Error('Plan not found');

  return plan;
});
