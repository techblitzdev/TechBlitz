import { NextRequest, NextResponse } from 'next/server';
import { isAuthorized } from '@/utils/cron';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // get users who have opted into push notifications
  const users = await prisma.users.findMany({
    where: {
      sendPushNotifications: true,
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

  return NextResponse.json(
    {
      message: `Found ${userAnswers.length} users who have not completed a challenge in the last 7 days`,
    },
    { status: 200 }
  );
}
