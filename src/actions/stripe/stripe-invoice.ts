'use server';

import Stripe from 'stripe';

export const createSubscription = async (
  user: Stripe.Customer,
  priceId: string,
  stripe: Stripe
): Promise<{ subscriptionId: string; clientSecret: string | null } | null> => {
  if (!user || !user.id) {
    return Promise.reject('Invalid user');
  }

  try {
    // Create a subscription
    const subscription = await stripe.subscriptions.create({
      customer: user.id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        email: user.email,
      },
    });

    // Type assertion to access the expanded invoice and payment intent
    const invoice = subscription.latest_invoice as Stripe.Invoice;
    const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;

    // If there's no payment intent, something went wrong
    if (!paymentIntent) {
      // Cancel the subscription since payment failed
      await stripe.subscriptions.cancel(subscription.id);
      return Promise.reject('Failed to create payment intent for subscription');
    }

    return {
      subscriptionId: subscription.id,
      clientSecret: paymentIntent.client_secret,
    };
  } catch (error) {
    console.error('Error creating subscription:', error);
    return Promise.reject(error);
  }
};

// Optional: Helper function to handle subscription updates
export const updateSubscription = async (
  subscriptionId: string,
  newPriceId: string,
  stripe: Stripe
): Promise<Stripe.Subscription> => {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    return await stripe.subscriptions.update(subscriptionId, {
      items: [
        {
          id: subscription.items.data[0].id,
          price: newPriceId,
        },
      ],
      proration_behavior: 'create_prorations',
    });
  } catch (error) {
    console.error('Error updating subscription:', error);
    return Promise.reject(error);
  }
};

// Optional: Helper function to cancel subscription
export const cancelSubscription = async (
  subscriptionId: string,
  stripe: Stripe
): Promise<Stripe.Subscription> => {
  try {
    return await stripe.subscriptions.cancel(subscriptionId, {
      prorate: true,
    });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    return Promise.reject(error);
  }
};

// Optional: Helper function to check subscription status
export const getSubscriptionStatus = async (
  subscriptionId: string,
  stripe: Stripe
): Promise<Stripe.Subscription> => {
  try {
    return await stripe.subscriptions.retrieve(subscriptionId);
  } catch (error) {
    console.error('Error retrieving subscription:', error);
    return Promise.reject(error);
  }
};
