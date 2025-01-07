import Stripe from 'stripe';
import { prisma } from '@/utils/prisma';
import { resend } from '@/lib/resend';
import { stripe } from '@/lib/stripe';

export const checkoutSessionCompleted = async (event: Stripe.Event) => {
  const session = event.data.object as Stripe.Checkout.Session;

  console.log('checkoutSessionCompleted', session);

  try {
    // Get the client_reference_id which contains the user.uid
    const userId = session.client_reference_id;

    if (!userId) {
      console.log('No client_reference_id found in session');
      throw new Error('No client_reference_id found in session');
    }

    // we first NEED to ensure that the userLevel is set to PREMIUM
    await prisma.users.update({
      where: {
        uid: userId,
      },
      data: {
        userLevel: 'PREMIUM',
      },
    });

    // Find user by uid
    const user = await prisma.users.findUnique({
      where: {
        uid: userId,
      },
    });

    if (!user) {
      console.log(`No user found with uid: ${userId}`);
      throw new Error(`No user found with uid: ${userId}`);
    }

    // Get the email used in this purchase (might be different from user's registered email)
    let customerEmail: string | null = null;
    if (session.customer) {
      try {
        const customer = await stripe.customers.retrieve(
          session.customer as string
        );
        if (customer && !('deleted' in customer)) {
          customerEmail = (customer as Stripe.Customer).email;
        }

        // if the customer is null, set the customer email to the session email
        if (!customer) {
          customerEmail = session.customer_details?.email || null;
        }
      } catch (error) {
        // silently fail and log
        console.log('Error retrieving customer:', error);
      }
    }
    const sessionEmail = session.customer_details?.email;

    console.log('User email:', user.email);
    console.log('Customer email:', customerEmail);
    console.log('Session email:', sessionEmail);

    // If the customer used a different email with Link, store it
    if (customerEmail && customerEmail !== user.email) {
      await prisma.users.update({
        where: { uid: userId },
        data: {
          stripeEmails: {
            push: customerEmail,
          },
        },
      });
    }

    // Update the subscription
    await prisma.subscriptions.update({
      where: {
        userUid: userId,
      },
      data: {
        active: true,
        stripeSubscriptionId: session.id,
        stripeCustomerId: customerEmail,
        updatedAt: new Date(),
      },
    });

    console.log('User subscribed:', user.email);
    return true;
  } catch (error) {
    console.error('Failed to process webhook event:', error);
    throw error; // Re-throw to ensure the webhook knows there was an error
  }
};
