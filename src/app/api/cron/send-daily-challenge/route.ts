import { DailyChallengeEmailTemplate } from '@/components/templates/daily-challenge';
import { prisma } from '@/lib/prisma';
import { resend } from '@/lib/resend';
import { getTodaysQuestion } from '@/utils/data/questions/get-today';
import { renderAsync } from '@react-email/components';
import { NextRequest } from 'next/server';
import React from 'react';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

// my user uid for testing this.
const TEST_USER_UID = '3a57d7e8-8b80-483b-93d0-70fe1f06b0c0';

export async function GET(request: NextRequest) {
  console.log('Sending daily challenge email');

  console.log(request);

  // get the daily challenge
  const dailyChallenge = await getTodaysQuestion();

  if (!dailyChallenge) {
    // send myself an email
    // todo - create a new email domain for this
    await resend.emails.send({
      from: 'team@techblitz.dev',
      to: 'team@techblitz.dev',
      subject: 'No daily challenge found',
      html: '<p>No daily challenge found</p>',
    });
    // return a 404s
    return new Response('No daily challenge found', { status: 404 });
  }

  // get the users
  const user = await prisma.users.findUnique({
    where: {
      uid: TEST_USER_UID,
    },
  });

  if (!user) {
    return new Response('User not found', { status: 404 });
  }

  // build out the link
  const link = `${process.env.NEXT_PUBLIC_URL}/question/${dailyChallenge.slug}`;

  const html = await renderAsync(
    React.createElement(DailyChallengeEmailTemplate, {
      title: 'Your daily challenge is ready!',
      description: '',
      tags: dailyChallenge?.tags?.map((tag) => tag.tag.name) || [],
      link,
      difficulty: dailyChallenge.difficulty,
    })
  );

  await resend.emails.send({
    from: 'team@techblitz.dev',
    to: user.email,
    subject: 'Your Daily Challenge is ready!',
    html,
  });

  return new Response('Email sent', { status: 200 });
}
