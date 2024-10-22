'use server';
import Stripe from 'stripe';
import {
  lookupCustomer,
  createCustomer,
} from '@/actions/stripe/stripe-customer';

/**
 * @description create a new subscripton for a customer.
 */
export const createSubscription = async () => {};
