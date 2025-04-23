'use server';
import React from 'react';

import NoChallengesEmail from '@/components/emails/7-days-no-challenges';
import { renderAsync } from '@react-email/components';

import { SUGGESTED_CHALLENGE_EMAIL_7_DAYS } from '@/utils/constants';
import { getUserDisplayName } from '@/utils/user';
import { getSuggestions } from '@/utils/data/questions/get-suggestions';

import { resend } from '@/lib/resend';
import { prisma } from '@/lib/prisma';

import type { UserRecord, QuestionDifficulty } from '@/types';

interface SendNoChallengesEmailProps {
  user: UserRecord;
  daysInactive?: number;
}

interface SuggestedChallenge {
  title: string;
  difficulty: QuestionDifficulty | string;
  url: string;
}

/**
 * Sends a reminder email to users who haven't completed challenges in 7 days
 *
 * @param user The user to send the email to
 * @param suggestedChallenge An optional challenge to suggest to the user
 * @param daysInactive Number of days the user has been inactive (defaults to 7)
 */
export const sendNoChallengesEmail = async ({
  user,
  daysInactive = 7,
}: SendNoChallengesEmailProps) => {
  if (!user || !user.email) {
    console.error('User is null or has no email');
    return;
  }

  // Get random subject and description from the constants
  const randomIndex = Math.floor(
    Math.random() * SUGGESTED_CHALLENGE_EMAIL_7_DAYS(getUserDisplayName(user)).length
  );
  const emailTemplate = SUGGESTED_CHALLENGE_EMAIL_7_DAYS(getUserDisplayName(user))[randomIndex];

  // Get user streak information
  const streakInfo = await prisma.streaks.findUnique({
    where: { userUid: user.uid },
    select: { longestStreak: true },
  });

  // Get a suggested challenge
  let suggestedChallenge: SuggestedChallenge;
  try {
    // Use the getSuggestions function to get personalized challenge recommendations
    const suggestions = await getSuggestions({ limit: 1, userUid: user.uid });

    if (suggestions && suggestions.length > 0) {
      const suggestedQuestion = suggestions[0];
      // Make sure we have a slug, falling back to uid if needed
      const questionSlug = suggestedQuestion.slug || suggestedQuestion.uid;

      suggestedChallenge = {
        title: suggestedQuestion.title || 'Daily Coding Challenge',
        difficulty: suggestedQuestion.difficulty || 'BEGINNER',
        url: `${process.env.NEXT_PUBLIC_URL}/question/${questionSlug}`,
      };
    } else {
      // Fallback challenge if no suggestions found
      suggestedChallenge = {
        title: 'Writing Your First Function',
        difficulty: 'BEGINNER',
        url: `${process.env.NEXT_PUBLIC_URL}/question/writing-your-first-function`,
      };
    }
  } catch (error) {
    console.error('Error getting suggested challenge:', error);

    // Fallback challenge
    suggestedChallenge = {
      title: 'Writing Your First Function',
      difficulty: 'BEGINNER',
      url: `${process.env.NEXT_PUBLIC_URL}/question/writing-your-first-function`,
    };
  }

  // Render the email template
  const html = await renderAsync(
    React.createElement(NoChallengesEmail, {
      userName: getUserDisplayName(user),
      userEmail: user.email,
      suggestedChallenge,
      streakCount: streakInfo?.longestStreak || 0,
      daysInactive,
    })
  );

  // Send the email
  await resend.emails.send({
    from: 'TechBlitz <team@techblitz.dev>',
    to: user.email,
    subject: emailTemplate.subject,
    html,
    // Schedule email to be sent in 10 minutes in production to allow for cancellation
    scheduledAt: process.env.NODE_ENV === 'production' ? 'in 10 minutes' : undefined,
  });

  // Update the user's last email sent timestamp
  await prisma.users.update({
    where: { uid: user.uid },
    data: {
      updatedAt: new Date(),
      hasSent7DayNoChallengeEmail: process.env.NODE_ENV === 'production' ? true : false,
    },
  });

  return { success: true };
};
