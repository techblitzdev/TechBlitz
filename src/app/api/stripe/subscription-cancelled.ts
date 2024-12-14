import { prisma } from '@/utils/prisma';
import Stripe from 'stripe';

// we know we are in the correct event type as we call it from /stripe/route.ts
export async function CancelSubscription(event: Stripe.Event) {
  const subscriptionId = (event.data.object as Stripe.Subscription).id;

  try {
    console.log('Subscription deleted');
    // set the user's subscription to inactive
    // and set their userLevel to FREE

    // get the subscription details from prisma via the subscriptionId
    const subscriptionCanceled = await prisma.subscriptions.findFirst({
      where: {
        stripeSubscriptionId: subscriptionId
      },
      include: {
        user: true
      }
    });

    if (!subscriptionCanceled) {
      return new Response('Subscription not found', { status: 404 });
    }

    await prisma.$transaction([
      prisma.users.update({
        where: {
          uid: subscriptionCanceled.user.uid
        },
        data: {
          userLevel: 'FREE'
        }
      }),
      prisma.subscriptions.update({
        where: {
          uid: subscriptionCanceled.uid
        },
        data: {
          active: false,
          updatedAt: new Date(),
          stripeSubscriptionId: null,
          stripeCustomerId: null,
          stripeSubscriptionItemId: null,
          endDate: new Date(),
          productId: ''
        }
      })
    ]);
  } catch (err) {
    console.log('Error constructing event');
    return new Response('Webhook Error', { status: 400 });
  }

  return new Response('Webhook executed', { status: 200 });
}
