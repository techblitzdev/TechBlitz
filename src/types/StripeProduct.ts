import Stripe from 'stripe';

// we only need these properties from the Stripe.Product type
type StripeProductBase = Pick<
  Stripe.Product,
  'id' | 'name' | 'description' | 'metadata'
>;

/**
 * This is typed this way due to the way we 'extend' the Stripe.Product type
 * when we return it from our API. We need to specify that the default_price
 * property will NOT be a string, and will always be a Stripe.Price object type.
 */
export interface StripeProduct extends StripeProductBase {
  default_price: Stripe.Price;
  features: Record<'name', string>[];
}
