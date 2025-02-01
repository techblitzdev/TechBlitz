"use server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { getUserFromSession } from "../user/authed/get-user";

type SubscriptionResponse = {
  subscriptionId: string;
  clientSecret: string | null;
  customerId: string;
  isNewCustomer: boolean;
  stripeSubscriptionItemId: string;
} | null;

/**
 * Looks up or creates a customer and creates a subscription for them
 */
export const createSubscription = async (
  priceId: string,
): Promise<SubscriptionResponse> => {
  const { data } = await getUserFromSession();
  if (!data) {
    throw new Error("User not found");
  }

  const email = data.user?.email;
  if (!email) {
    throw new Error("User email not found");
  }

  try {
    // Try to look up the customer
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

    // Check if the user already has an active subscription
    const existingSubscription = await hasActiveSubscription(
      customer.id,
      priceId,
      stripe,
    );

    let subscription: Stripe.Subscription;

    console.log("existingSubscription:", existingSubscription);

    if (existingSubscription.data.length > 0) {
      console.log("existing subscription");
      // Update the existing Stripe subscription with the new price
      subscription = await stripe.subscriptions.update(
        existingSubscription.data[0].id,
        {
          items: [
            {
              id: existingSubscription.data[0].items.data[0].id,
              price: priceId,
            },
          ],
          proration_behavior: "create_prorations",
        },
      );
    } else {
      console.log("new subscription");
      // Create a new subscription
      subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: priceId }],
        payment_behavior: "default_incomplete",
        payment_settings: {
          save_default_payment_method: "on_subscription",
          payment_method_types: ["card"],
        },
        expand: ["latest_invoice.payment_intent"],
        metadata: {
          email: customer.email,
        },
      });
    }

    // Access the expanded invoice and payment intent
    const invoice = subscription.latest_invoice as Stripe.Invoice;
    const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;

    if (!paymentIntent?.client_secret) {
      // Cancel the subscription if payment intent creation failed
      await stripe.subscriptions.cancel(subscription.id);
      throw new Error("Failed to create payment intent for subscription");
    }

    return {
      subscriptionId: subscription.id,
      clientSecret: paymentIntent.client_secret,
      customerId: customer.id,
      isNewCustomer,
      stripeSubscriptionItemId: subscription.items.data[0].id,
    };
  } catch (error) {
    console.error("Error in createSubscription:", error);
    throw error;
  }
};

/**
 * Attempts to lookup a customer by email
 */
export const lookupCustomer = async (
  email: string,
  stripe: Stripe,
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
  stripe: Stripe,
): Promise<Stripe.Customer> => {
  try {
    return await stripe.customers.create(customerParams);
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};

/**
 * Checks if customer has an active subscription for a specific product
 */
export const hasActiveSubscription = async (
  customerId: string,
  priceId: string,
  stripe: Stripe,
): Promise<Stripe.Response<Stripe.ApiList<Stripe.Subscription>>> => {
  try {
    return await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      expand: ["data.items.data.price"],
    });
  } catch (error) {
    console.error("Error checking active subscription:", error);
    throw error;
  }
};
