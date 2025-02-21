import { SuggestedChallengeEmailTemplate } from '@/components/templates/daily-challenge';
import { prisma } from '@/lib/prisma';
import { resend } from '@/lib/resend';
import { QuestionWithTags } from '@/types/Questions';
import { UserRecord } from '@/types/User';
import {
  SUGGESTED_CHALLENGE_EMAIL_DESCRIPTION,
  SUGGESTED_CHALLENGE_EMAIL_SUBJECT,
} from '@/utils/constants';
import { getSuggestions } from '@/utils/data/questions/get-suggestions';
import { getUserDisplayName } from '@/utils/user';
import { renderAsync } from '@react-email/components';
import { type NextRequest, NextResponse } from 'next/server';
import React from 'react';

export const dynamic = 'force-dynamic';

const getRandomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

async function getChallenge(userUid: string) {
  const suggestions = await getSuggestions({ limit: 1, userUid });
  if (!suggestions || suggestions.length === 0) {
    return null;
  }
  return suggestions[0];
}

async function sendEmail(user: UserRecord, challenge: QuestionWithTags) {
  const displayName = getUserDisplayName(user);
  const subject = getRandomElement(SUGGESTED_CHALLENGE_EMAIL_SUBJECT(displayName));
  const description = getRandomElement(SUGGESTED_CHALLENGE_EMAIL_DESCRIPTION(displayName));

  // very minor chance the question will not have a slug, so we use the uid as a fallback
  const challengeSlug = challenge.slug || challenge.uid;

  const link = `${process.env.NEXT_PUBLIC_URL}/question/${challengeSlug}`;

  const html = await renderAsync(
    React.createElement(SuggestedChallengeEmailTemplate, {
      title: subject,
      description,
      tags: challenge.tags?.map((tag: { tag: { name: string } }) => tag.tag.name) || [],
      link,
    })
  );

  await resend.emails.send({
    from: 'TechBlitz <team@techblitz.dev>',
    to: user.email,
    subject,
    html,
    replyTo: 'team@techblitz.dev',
  });
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  console.log('Sending daily challenge email');

  try {
    const users = await prisma.users.findMany({
      where: {
        sendPushNotifications: true,
      },
    });

    if (!users.length) {
      return NextResponse.json({ message: 'No users found' }, { status: 404 });
    }

    // Process users in batches of 5 to avoid connection pool exhaustion
    const batchSize = 5;
    const results = [];

    for (let i = 0; i < users.length; i += batchSize) {
      const batch = users.slice(i, i + batchSize);

      const batchResults = await Promise.allSettled(
        batch.map(async (user) => {
          try {
            const challenge = await getChallenge(user.uid);
            if (!challenge) {
              console.log(`No challenge found for user ${user.email}`);
              return;
            }
            const challengeWithTags = {
              ...challenge,
              tags: challenge.tags || [],
            } as QuestionWithTags;

            await sendEmail(user, challengeWithTags);
            return user.email;
          } catch (error) {
            console.error(`Failed to process user ${user.email}:`, error);
          }
        })
      );

      results.push(...batchResults);

      // Add a small delay between batches to allow connections to be released
      if (i + batchSize < users.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    const successfulEmails = results
      .filter(
        (result): result is PromiseFulfilledResult<string> =>
          result.status === 'fulfilled' && !!result.value
      )
      .map((result) => result.value);

    return NextResponse.json(
      {
        message: `Emails sent successfully to ${successfulEmails.length} users`,
        successfulEmails,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to send daily challenge emails:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
