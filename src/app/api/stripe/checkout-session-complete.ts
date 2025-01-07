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
    const customer = await stripe.customers.retrieve(
      session.customer as string
    );
    const customerEmail = (customer as Stripe.Customer).email;
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

    // Update the user's userLevel
    await prisma.users.update({
      where: {
        uid: userId,
      },
      data: {
        userLevel: 'PREMIUM',
      },
    });

    // Update the subscription
    await prisma.subscriptions.update({
      where: {
        userUid: userId,
      },
      data: {
        active: true,
        stripeSubscriptionId: session.id,
        stripeCustomerId: session.customer as string,
        updatedAt: new Date(),
      },
    });

    // Send notification email
    await resend.emails.send({
      to: 'team@techblitz.dev',
      from: 'team@techblitz.dev',
      subject: 'User subscribed',
      text: `User ${user.email} (${customerEmail || 'no customer email'}) has subscribed to TechBlitz Premium.`,
    });

    console.log('User subscribed:', user.email);
    return true;
  } catch (error) {
    console.error('Failed to process webhook event:', error);
    throw error; // Re-throw to ensure the webhook knows there was an error
  }
};
