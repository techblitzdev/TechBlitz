'use server';
import { resend } from '@/lib/resend';
import type { UserRecord } from '@/types/User';
import WelcomeEmail from '@/components/emails/welcome';

/**
 * Sends a welcome email to the user once they have completed the onboarding process
 *
 * @param user
 * @returns
 */
export const sendWelcomeEmail = async (user: Partial<UserRecord> | null, coupon: string) => {
  if (!user) {
    console.error('User is null');
    return;
  }

  const { email, username } = user;

  if (!email) {
    console.error('User has no email');
    return;
  }

  const userName = username || 'there';

  await resend.emails.send({
    from: 'Logan from TechBlitz <team@techblitz.dev>',
    to: email,
    subject: 'Welcome to TechBlitz!',
    react: WelcomeEmail({
      userName,
      couponCodeText: coupon,
      userEmail: email,
    }),
    scheduledAt: process.env.NODE_ENV === 'production' ? 'in 10 minutes' : undefined,
  });
};
