import Stripe from 'stripe';
import { prisma } from '@/utils/prisma';
import { resend } from '@/lib/resend';
import { stripe } from '@/lib/stripe';

export async function checkoutSessionCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;

  // we only have one product that a user can subscribe to (for now)
  // so we will just be updating the users userLevel to 'PREMIUM'
  // and setting their subscription to active
  try {
    // get the user's email address from the session
    // this is what we use to upgrade the user's account.
    // from their email, we get the userUid to then update the user's userLevel,
    // as well as get the user's subscription to update the subscription status
    // Get the customer email
    const customer = await stripe.customers.retrieve(
      session.customer as string
    );
    const userEmail = (customer as Stripe.Customer).email;

    console.log('userEmail', userEmail);

    if (!userEmail) {
      console.log('No user email found');
      return;
    }

    // find the user via their email they have entered in the checkout session
    const user = await prisma.users.findFirst({
      where: {
        email: userEmail
      }
    });

    // we need the user in order to update their details
    if (!user) {
      console.log('No user found');
      return;
    }

    const userUid = user.uid;

    // update the user's userLevel to 'PREMIUM'
    await prisma.users.update({
      where: {
        uid: userUid
      },
      data: {
        userLevel: 'PREMIUM'
      }
    });

    // update the user's subscription to active
    await prisma.subscriptions.update({
      where: {
        userUid
      },
      data: {
        active: true,
        stripeSubscriptionId: session.subscription as string,
        stripeCustomerId: session.customer as string,
        updatedAt: new Date()
      }
    });

    // send my self an email to notify me that a user has subscribed
    await resend.emails.send({
      to: '',
      from: 'team@techblitz.dev',
      subject: 'User subscribed',
      text: `User ${userEmail}, has subscribed to TechBlitz premium.`
    });

    console.log('User subscribed:', userEmail);

    return true;
  } catch (error) {
    console.error('Failed to process webhook event:', error);
  }
}
