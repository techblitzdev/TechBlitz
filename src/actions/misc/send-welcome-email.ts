'use server';
import { resend } from '@/lib/resend';
import { UserRecord } from '@/types/User';

/**
 * Sends a welcome email to the user once they have completed the onboarding process
 *
 * @param user
 * @returns
 */
export const sendWelcomeEmail = async (user: UserRecord | null, coupon: string) => {
  if (!user) {
    console.error('User is null');
    return;
  }

  const { email } = user;

  if (!email) {
    console.error('User has no email');
    return;
  }

  await resend.emails.send({
    from: 'Logan from TechBlitz <logan@techblitz.dev>',
    to: email,
    subject: 'Welcome to TechBlitz!',
    html: `
        <p>Hey there,</p>
        <p>Welcome to TechBlitz! We're thrilled to have you join our community of tech enthusiasts.</p>
        <p>I'm Logan, the founder of TechBlitz, and I wanted to reach out to thank you for becoming part of our growing community. Your decision to join us means a lot!</p>
        <p>At <a href="https://dub.sh/6jCUZoI">TechBlitz</a>, we're building a vibrant community of tech enthusiasts who are dedicated to continuous learning and growth. Whether you're preparing for technical interviews, expanding your programming knowledge, or simply love solving challenging problems - you're in the right place.</p>
        <p>As a special thank you for joining us, we're offering you a 60% discount on your first three months of a premium subscription. Use code <strong>${coupon}</strong> to get started.</p>
        <p>If you want to follow along with the development of TechBlitz, you can do so <a href="git.new/blitz">here</a>. Your support truly means the world to us.</p> 
        <p>If you have questions or feedback, please don't hesitate to reach out to me by <a href="mailto:logan@techblitz.dev">email</a>.</p>
        <p>Let's revolutionize the tech world together!</p>
        <p>Best regards,</p>
        <p>Logan</p>
        `,
    scheduledAt: 'in 10 minutes',
  });
};
