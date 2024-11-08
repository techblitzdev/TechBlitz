'use server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { getUserFromSession } from '../user/get-user';

/**
 * Looks up or creates a customer and creates a subscription for them
 */
export const createSubscription = async (
  priceId: string
): Promise<{
  subscriptionId: string;
  clientSecret: string | null;
  customerId: string;
  isNewCustomer: boolean;
  stripeSubscriptionItemId: string;
} | null> => {
  const { data } = await getUserFromSession();
  if (!data) {
    throw new Error('User not found');
  }

  const email = data.user?.email;
  if (!email) {
    throw new Error('User email not found');
  }

  try {
    // First, try to look up the customer
    let customer = await lookupCustomer(email, stripe);
    let isNewCustomer = false;

    // If customer doesn't exist, create one
    if (!customer) {
      const customerParams: Stripe.CustomerCreateParams = {
        email,
        metadata: {
          createdAt: new Date().toISOString(),
        },
      };
      customer = await createCustomer(customerParams, stripe);
      isNewCustomer = true;
    }

    // Now create the subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        save_default_payment_method: 'on_subscription',
        payment_method_types: ['card'],
      },
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        email: customer.email,
      },
    });

    // Type assertion to access the expanded invoice and payment intent
    const invoice = subscription.latest_invoice as Stripe.Invoice;
    const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;

    if (!paymentIntent?.client_secret) {
      // Cancel the subscription since payment intent creation failed
      await stripe.subscriptions.cancel(subscription.id);
      throw new Error('Failed to create payment intent for subscription');
    }

    return {
      subscriptionId: subscription.id,
      clientSecret: paymentIntent.client_secret,
      customerId: customer.id,
      isNewCustomer,
      stripeSubscriptionItemId: subscription.items.data[0].id,
    };
  } catch (error) {
    console.error('Error in handleCustomerSubscription:', error);
    throw error;
  }
};

/**
 * Attempts to lookup a customer by email
 */
export const lookupCustomer = async (
  email: string,
  stripe: Stripe
): Promise<Stripe.Customer | null> => {
  const existingCustomer = await stripe.customers.list({
    email: email,
    limit: 1,
  });

  return existingCustomer.data.length ? existingCustomer.data[0] : null;
};

/**
 * Creates a stripe customer
 */
export const createCustomer = async (
  customerParams: Stripe.CustomerCreateParams,
  stripe: Stripe
): Promise<Stripe.Customer> => {
  try {
    return await stripe.customers.create(customerParams);
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

/**
 * Gets all active subscriptions for a customer
 */
export const getCustomerSubscriptions = async (
  customerId: string,
  stripe: Stripe
): Promise<Stripe.Subscription[]> => {
  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
    });
    return subscriptions.data;
  } catch (error) {
    console.error('Error getting customer subscriptions:', error);
    throw error;
  }
};

/**
 * Checks if customer has an active subscription for a specific product
 */
export const hasActiveSubscription = async (
  customerId: string,
  productId: string,
  stripe: Stripe
): Promise<boolean> => {
  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
      expand: ['data.items.data.price.product'],
    });

    return subscriptions.data.some((subscription) =>
      subscription.items.data.some((item) => {
        const product = item.price.product as Stripe.Product;
        return product.id === productId;
      })
    );
  } catch (error) {
    console.error('Error checking active subscription:', error);
    throw error;
  }
};
