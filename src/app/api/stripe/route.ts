import { stripe } from '@/lib/stripe';
import { NextRequest } from 'next/server';
import { cancelSubscription } from './subscription-cancelled';
import { checkoutSessionCompleted } from './checkout-session-complete';
import { invoicePaymentFailed } from './invoice-payment-failed';

// huge shout-out to dub.co for the inspiration for this approach <3
export async function POST(req: NextRequest) {
  // Ensure that stripe is initialized
  if (!stripe) {
    console.log('stripe is not initialized');
    throw new Error('Stripe is not initialized');
  }

  // turn the body into string
  const body = await req.text();

  // get the stripe signature from the request headers
  const signature = req.headers.get('Stripe-Signature');

  if (!signature) {
    console.log('No stripe signature found');
    return new Response('No stripe signature found', { status: 400 });
  }

  let event;
  try {
    const webhookSecret = 'whsec_EvMQRESYJmMqMPzPrpYBg0A6XAstosZ1'; //process.env.NEXT_PRIVATE_STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.log('No webhook secret found');
      return new Response('No webhook secret found', { status: 400 });
    }

    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    if (!event) {
      console.log('No event found');
      throw new Error('No event found');
    }

    switch (event.type) {
      // when a subscription is deleted
      case 'customer.subscription.deleted':
        await cancelSubscription(event);
        break;
      // when a checkout / purchase is completed
      case 'checkout.session.completed':
      case 'customer.subscription.updated':
        await checkoutSessionCompleted(event);
        break;
      // when a payment fails
      case 'invoice.payment_failed':
        await invoicePaymentFailed(event);
        break;
      default:
        console.log('Unhandled event type');
        return new Response('Unhandled event type', { status: 400 });
    }

    return new Response('Webhook executed', { status: 200 });
  } catch (error) {
    console.error('Failed to process webhook event:', error);
    return new Response('Failed to process webhook event', { status: 400 });
  }
}
