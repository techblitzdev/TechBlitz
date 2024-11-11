import { NextRequest } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/utils/prisma';

const webhookSecret = process.env.NEXT_PRIVATE_STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  // Ensure that stripe is initialized
  if (!stripe) {
    console.log('stripe is not initialized');
    throw new Error('Stripe is not initialized');
  }

  // update the users details in the database
  if (!prisma) {
    console.log('Prisma is not initialized');
    throw new Error('Prisma is not initialized');
  }

  // turn the body into string
  const body = await req.text();

  // get the stripe signature from the request headers
  const signature = req.headers.get('Stripe-Signature');

  if (!signature) {
    console.log('No stripe signature found');
    return new Response('No stripe signature found', { status: 400 });
  }
  if (!webhookSecret) {
    console.error('Missing STRIPE_WEBHOOK_SECRET');
    return new Response('Configuration error', {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    if (!event) {
      console.log('No event found');
      throw new Error('No event found');
    }

    switch (event.type) {
      case 'customer.subscription.deleted':
        console.log('Subscription deleted');
        // set the user's subscription to inactive
        // and set their userLevel to FREE
        const subscriptionId = event.data.object.id;

        // get the subscription details from prisma via the subscriptionId
        const subscriptionCanceled = await prisma.subscriptions.findFirst({
          where: {
            stripeSubscriptionId: subscriptionId,
          },
          include: {
            user: true,
          },
        });

        if (!subscriptionCanceled) {
          return new Response('Subscription not found', { status: 404 });
        }

        await prisma.$transaction([
          prisma.users.update({
            where: {
              uid: subscriptionCanceled.user.uid,
            },
            data: {
              userLevel: 'FREE',
            },
          }),
          prisma.subscriptions.update({
            where: {
              uid: subscriptionCanceled.uid,
            },
            data: {
              active: false,
              updatedAt: new Date(),
              stripeSubscriptionId: null,
              stripeCustomerId: null,
              stripeSubscriptionItemId: null,
              endDate: new Date(),
              productId: '',
            },
          }),
        ]);

        console.log('Subscription deleted');
        break;
      case 'customer.subscription.updated':
        console.log('Subscription updated');
        // get the subscription details from prisma via the subscriptionId

        // grab the subscription id
        const stripeSubscriptionId = event.data.object.id;

        // get it from prisma - we can also get the user details from here
        const subscription = await prisma.subscriptions.findFirst({
          where: {
            stripeSubscriptionId,
          },
          include: {
            user: true,
          },
        });

        if (!subscription) {
          return new Response('Subscription not found', { status: 404 });
        }

        // get the new subscription status, we only care about the following statuses
        const newStatus = event.data.object.status;
        if (
          newStatus === 'past_due' ||
          newStatus === 'unpaid' ||
          newStatus === 'incomplete_expired' ||
          newStatus === 'paused'
        ) {
          // set the user's subscription to inactive
          // and set their userLevel to FREE

          await prisma.$transaction([
            prisma.users.update({
              where: {
                uid: subscription.user.uid,
              },
              data: {
                userLevel: 'FREE',
              },
            }),

            prisma.subscriptions.update({
              where: {
                uid: subscription.uid,
              },
              data: {
                active: false,
                updatedAt: new Date(),
                stripeSubscriptionId: null,
                stripeCustomerId: null,
                stripeSubscriptionItemId: null,
                endDate: new Date(),
                productId: '',
              },
            }),
          ]);

          console.log('Subscription updated to FREE');
        }
        break;
      default:
        console.log('No event type found');
      //throw new Error('No event type found');
    }
  } catch (err) {
    console.log('Error constructing event');
    return new Response('Webhook Error', { status: 400 });
  }

  return new Response('Webhook executed', { status: 200 });
}
