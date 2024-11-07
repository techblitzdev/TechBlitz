'use server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { unstable_cache as NextCache } from 'next/cache';
import { StripeProduct } from '@/types/StripeProduct';

/**
 * Retrieves all products from the stripe account.
 *
 * @param stripe
 * @returns
 */
export const getStripeProducts = NextCache(
  async (): Promise<StripeProduct[]> => {
    if (!stripe) {
      throw new Error('Stripe is not initialized');
    }

    const products: Stripe.Response<Stripe.ApiList<Stripe.Product>> =
      await stripe.products.list({
        active: true,
        limit: 10,
        expand: ['data.default_price'],
      });

    if (!products) throw new Error('No products found');

    // sort the products in price order
    products.data.sort((a, b) => {
      if (!a.default_price || !b.default_price) return 0;
      // @ts-ignore - Typescript doesn't know we expanded the default_price
      return a.default_price.unit_amount - b.default_price.unit_amount;
    });

    return products.data.map((product) => {
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        features: product.marketing_features.map((feature) => ({
          name: feature.name || '',
        })),
        default_price: product.default_price as Stripe.Price,
        metadata: product.metadata,
      };
    });
  }
);

/**
 * @description Method to get a plan via it's id
 * @param planId - The id of the plan you want to get the data for
 */
export const getPlanById = NextCache(async (planId: string) => {
  // grab all of the products, doesn't matter if it's monthly or yearly
  const products = await getStripeProducts();
  if (!products) throw new Error('No products found');

  // find the plan
  const plan = products.find((product) => product.id === planId);
  if (!plan) throw new Error('Plan not found');

  return plan;
});
