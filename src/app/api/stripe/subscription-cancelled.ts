import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

// we know we are in the correct event type as we call it from /stripe/route.ts
export async function cancelSubscription(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session

  try {
    console.log('Subscription deleted')
    // set the user's subscription to inactive
    // and set their userLevel to FREE

    // get the user via their email address
    const customer = await stripe.customers.retrieve(session.customer as string)
    const userEmail = (customer as Stripe.Customer).email
    if (!userEmail) {
      console.log('No user email found')
      return
    }

    // go get the user's details from prisma
    const user = await prisma.users.findFirst({
      where: {
        OR: [{ email: userEmail }, { stripeEmails: { has: userEmail } }],
      },
    })

    if (!user) {
      console.log('No user found')
      return
    }

    // get the subscription details from prisma via the subscriptionId
    const subscriptionCanceled = await prisma.subscriptions.findFirst({
      where: {
        userUid: user.uid,
      },
      include: {
        user: true,
      },
    })

    if (!subscriptionCanceled) {
      console.log('Subscription not found')
      return new Response('Subscription not found', { status: 404 })
    }

    await prisma.$transaction([
      // downgrade the user's userLevel to FREE
      prisma.users.update({
        where: {
          uid: subscriptionCanceled.user.uid,
        },
        data: {
          userLevel: 'FREE',
        },
      }),
      // set the subscription to inactive
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
    ])
  } catch (err) {
    console.log('Error constructing event', err)
    return new Response('Webhook Error', { status: 400 })
  }

  console.log('Subscription canceled')
  return true
}
