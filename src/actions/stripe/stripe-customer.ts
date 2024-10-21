'use server';
import Stripe from 'stripe';

/**
 * Attempts to lookup a customer by the email passed in.
 *
 * @param email
 * @param stripe
 * @returns
 */
export const lookupCustomer = async (
  email: string,
  stripe: Stripe
): Promise<Stripe.Customer | null> => {
  // try to get the customer by the email passed in
  const existingCustomer: Stripe.Response<Stripe.ApiList<Stripe.Customer>> =
    await stripe.customers.list({
      email: email,
      limit: 1,
    });

  // if we get a value back, we return the first customer
  if (existingCustomer.data.length) {
    return existingCustomer.data[0];
  }

  // otherwise, there was no value found, we return null so we carry on with the flow
  // the next step would be to then try and create the customer
  return null;
};

/**
 * Creates a stripe customer via the params passed in.
 * This method is only ever called when lookupCustomer returns null.
 *
 * @param customerParams
 * @param stripe
 * @returns
 */
export const createCustomer = async (
  customerParams: Stripe.CustomerCreateParams,
  stripe: Stripe
): Promise<Stripe.Customer> => {
  try {
    return await stripe.customers.create(customerParams);
  } catch (error) {
    return Promise.reject(error);
  }
};
