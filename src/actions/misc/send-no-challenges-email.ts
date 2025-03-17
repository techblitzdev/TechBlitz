'use server';

import { resend } from '@/lib/resend';
import type { UserRecord } from '@/types/User';
import NoChallengesEmail from '@/components/emails/7-days-no-challenges';
import { SUGGESTED_CHALLENGE_EMAIL_7_DAYS } from '@/utils/constants';
import { renderAsync } from '@react-email/components';
import React from 'react';
import { getUserDisplayName } from '@/utils/user';
import { prisma } from '@/lib/prisma';
import { QuestionDifficulty } from '@/types/Questions';

interface SendNoChallengesEmailProps {
  user: UserRecord;
  suggestedChallenge?: {
    title: string;
    difficulty: string;
    url: string;
  };
  daysInactive?: number;
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
  suggestedChallenge,
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

  // Get a suggested challenge if not provided
  let challenge = suggestedChallenge;
  if (!challenge) {
    // Try to get a challenge based on user's difficulty level
    try {
      // Convert user level to question difficulty
      const difficultyLevel: QuestionDifficulty =
        user.userLevel === 'PREMIUM'
          ? 'MEDIUM' // Using valid QuestionDifficulty values
          : 'BEGINNER';

      const recommendedChallenge = await prisma.questions.findFirst({
        where: {
          difficulty: difficultyLevel,
          dailyQuestion: false, // Use fields that exist in the schema
        },
        select: {
          uid: true,
          title: true,
          slug: true,
          difficulty: true,
        },
        orderBy: {
          // Get a random question
          updatedAt: 'desc',
        },
        take: 1,
      });

      if (recommendedChallenge && recommendedChallenge.title) {
        challenge = {
          title: recommendedChallenge.title,
          difficulty: (recommendedChallenge.difficulty as string) || 'BEGINNER',
          url: `${process.env.NEXT_PUBLIC_URL}/question/${recommendedChallenge.slug}`,
        };
      } else {
        // Fallback challenge
        challenge = {
          title: 'Writing Your First Function',
          difficulty: 'BEGINNER',
          url: `${process.env.NEXT_PUBLIC_URL}/question/writing-your-first-function`,
        };
      }
    } catch (error) {
      console.error('Error getting recommended challenge:', error);

      // Fallback challenge
      challenge = {
        title: 'Writing Your First Function',
        difficulty: 'BEGINNER',
        url: `${process.env.NEXT_PUBLIC_URL}/question/writing-your-first-function`,
      };
    }
  }

  // Render the email template
  const emailHtml = await renderAsync(
    React.createElement(NoChallengesEmail, {
      userName: getUserDisplayName(user),
      userEmail: user.email,
      suggestedChallenge: challenge,
      streakCount: streakInfo?.longestStreak || 0,
      daysInactive,
    })
  );

  // Send the email
  await resend.emails.send({
    from: 'TechBlitz <team@techblitz.dev>',
    to: user.email,
    subject: emailTemplate.subject,
    react: emailHtml,
    // Schedule email to be sent in 10 minutes in production to allow for cancellation
    scheduledAt: process.env.NODE_ENV === 'production' ? 'in 10 minutes' : undefined,
  });

  // Update the user's last email sent timestamp
  await prisma.users.update({
    where: { uid: user.uid },
    data: {
      updatedAt: new Date(),
      hasSent7DayNoChallengeEmail: true,
    },
  });

  return { success: true };
};
