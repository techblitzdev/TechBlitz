'use server';
import Stripe from 'stripe';
// actions
import { createInvoice } from './stripe-invoice';
import { lookupCustomer, createCustomer } from './stripe-customer';
import { getUserFromSession } from '../user/get-user';
// types
import { StripeProduct } from '@/types/StripeProduct';

const stripe = new Stripe(
  process.env.NEXT_PRIVATE_STRIPE_SECRET_KEY as string,
  {
    apiVersion: '2024-09-30.acacia',
  }
);

export const createSubscription = async (
  plan: StripeProduct
): Promise<{
  invoice: string;
  paymentPrice: number;
} | null> => {
  // boot out very early if no plan, we need this to continue
  if (!plan) throw new Error('No plan provided.');

  console.log('Creating subscription for:', plan);

  // get the current user
  const { data: user } = await getUserFromSession();
  const userEmail = user?.user?.email;
  if (!userEmail) throw new Error('No user email found.');

  let currentUser: Stripe.Customer | null = null;
  // try to find the customer via the email
  const isExistingCustomer = await lookupCustomer(userEmail, stripe);

  if (isExistingCustomer) {
    currentUser = isExistingCustomer;
  }

  if (!isExistingCustomer) {
    const newCustomerParams: Stripe.CustomerCreateParams = {
      email: userEmail,
    };

    try {
      currentUser = await createCustomer(newCustomerParams, stripe);

      if (!currentUser) return null;
    } catch (error) {
      console.error('Error creating customer', error);
    }
  }
  if (!plan || !currentUser) return null;

  if (!plan.default_price || plan.default_price?.unit_amount === null)
    throw new Error('No default price found.');

  const invoice = await createInvoice(
    currentUser,
    plan.default_price?.unit_amount,
    stripe
  );
  if (!invoice) return null;

  return {
    invoice,
    paymentPrice: plan.default_price.unit_amount,
  };
};
