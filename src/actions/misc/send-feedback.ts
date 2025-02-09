'use server';
import { resend } from '@/lib/resend';
import { getUser } from '@/actions/user/authed/get-user';

interface FeedbackData {
  feedback: string;
  emoji?: string;
}

export const sendFeedback = async ({ feedback, emoji }: FeedbackData) => {
  const user = await getUser();

  if (!user) {
    throw new Error('User not found');
  }

  const emailText = `
    Feedback from ${user.email}:

    Rating: ${emoji || 'No rating provided'}
    Feedback: ${feedback}
  `;

  await resend.emails.send({
    from: 'TechBlitz <team@techblitz.dev>',
    to: 'team@techblitz.dev',
    subject: `Feedback from ${user.email} ${emoji || ''}`,
    text: emailText,
  });
};
