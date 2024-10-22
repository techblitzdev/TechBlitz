'use server';
import Stripe from 'stripe';

export const createInvoice = async (
  user: Stripe.Customer,
  amount: number,
  stripe: Stripe
): Promise<Stripe.PaymentIntent['client_secret'] | null> => {
  if (!user || !user.id) {
    return Promise.reject('Invalid user');
  }

  // try to create the invoice
  try {
    const invoice: Stripe.Invoice = await stripe.invoices.create({
      customer: user.id,
      description: 'Test Invoice',
      currency: 'gbp',
      auto_advance: false,
    });

    // create an invoice item
    /**
     * Invoice Items represent the component lines of an invoice. An invoice item is added to an
     * invoice by creating or updating it  with an invoice field, at which point it will be
     * included as an invoice line item within invoice.lines.
     */
    await stripe.invoiceItems.create({
      invoice: invoice?.id,
      customer: user?.id,
      unit_amount: amount,
      currency: 'gbp',
      quantity: 1,
    });

    const finalizedInvoice: Stripe.Response<Stripe.Invoice> =
        await stripe.invoices.finalizeInvoice(invoice.id, {
          auto_advance: true,
        }),
      paymentIntentId = finalizedInvoice?.payment_intent;

    let paymentIntent: Stripe.PaymentIntent;

    // if the payment intent is not a string, we need to cancel the flow
    if (typeof paymentIntentId !== 'string') return null;

    // if the payment intent is a string, we need to update it
    await stripe.paymentIntents.retrieve(paymentIntentId);

    // update the payment intent with the new payment intent id
    paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
      metadata: {
        email: user?.email,
        amount: amount,
      },
      receipt_email: user?.email,
    });

    return paymentIntent.client_secret;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
