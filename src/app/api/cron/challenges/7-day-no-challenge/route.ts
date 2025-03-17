import { NextRequest, NextResponse } from 'next/server';
import { isAuthorized } from '@/utils/cron';
import { prisma } from '@/lib/prisma';
import { sendNoChallengesEmail } from '@/actions/misc/send-no-challenges-email';

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // get users who have opted into push notifications
  const users = await prisma.users.findMany({
    where: {
      sendPushNotifications: true,
      AND: {
        hasSent7DayNoChallengeEmail: false, // meaning this is the first time they are receiving the email
      },
    },
  });

  // now get the users from this list who have not completed a challenge in the last 7 days
  const userAnswers = await prisma.answers.findMany({
    where: {
      userUid: { in: users.map((user) => user.uid) },
      createdAt: {
        gt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    },
  });

  // loop through the users and send them the email
  //for (const user of users) {
  //  await send7DayNoChallengeEmail(user);
  //
  //  // update the user to set the hasSent7DayNoChallengeEmail to true
  //  await prisma.users.update({
  //    where: { uid: user.uid },
  //    data: { hasSent7DayNoChallengeEmail: true },
  //  });
  //}

  // TESTING SEND TO ME
  const email = 'logan@hiyield.co.uk';
  const user = await prisma.users.findUnique({
    where: { email },
  });
  if (user) {
    await sendNoChallengesEmail({
      user,
      suggestedChallenge: {
        title: 'Writing Your First Function',
        difficulty: 'Beginner',
        url: 'https://techblitz.dev/question/writing-your-first-function',
      },
    });
  }

  return NextResponse.json(
    {
      message: `Found ${userAnswers.length} users who have not completed a challenge in the last 7 days`,
    },
    { status: 200 }
  );
}
