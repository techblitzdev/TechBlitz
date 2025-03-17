import { prisma } from '@/lib/prisma';
import { isAuthorized } from '@/utils/cron';
import { NextRequest, NextResponse } from 'next/server';
import { resend } from '@/lib/resend';
import { renderAsync } from '@react-email/components';
import StudyReminderEmail from '@/components/emails/study-reminder';
import React from 'react';
import { UserRecord } from '@/types/User';
import { StudyPath, StudyPathGoal, UserStudyPath } from '@prisma/client';
import { getUserDisplayName } from '@/utils/user';
import { STUDY_REMINDER_EMAIL_SUBJECT } from '@/utils/constants/study-reminder';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 300; // 5 minutes

type GoalWithRelations = StudyPathGoal & {
  studyPath: StudyPath;
  user: UserRecord;
  userStudyPath: UserStudyPath;
};

async function SendEmail(goal: GoalWithRelations) {
  const displayName = getUserDisplayName(goal.user);
  const subject = `TechBlitz - Daily Goal Reminder`;
  const link = `${process.env.NEXT_PUBLIC_URL}/roadmap/${goal.studyPathUid}`;

  // calculate the days remaining by comparing the target date to the current date
  const daysRemaining = Math.ceil(
    (goal.targetDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const html = await renderAsync(
    React.createElement(StudyReminderEmail, {
      studyPathTitle: goal.studyPath.title,
      goalDate: goal.targetDate.toLocaleDateString(),
      progressPercentage: goal.userStudyPath.progress.toFixed(2),
      daysRemaining,
      link,
      headingText:
        STUDY_REMINDER_EMAIL_SUBJECT(displayName)[
          Math.floor(Math.random() * STUDY_REMINDER_EMAIL_SUBJECT(displayName).length)
        ],
    })
  );

  await resend.emails.send({
    from: 'TechBlitz <team@techblitz.dev>',
    to: goal.user.email,
    subject,
    html,
    replyTo: 'team@techblitz.dev',
  });
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // get all users who have a goal
  const goals = await prisma.studyPathGoal.findMany({
    where: {
      targetDate: {
        gt: new Date(),
      },
      AND: {
        completed: false,
      },
    },
    include: {
      user: true,
      studyPath: true,
      userStudyPath: true,
    },
  });

  // loop through all users and send a reminder email
  for (const goal of goals) {
    if (!goal || !goal.userStudyPath) continue;
    await SendEmail(goal as GoalWithRelations);
  }

  return NextResponse.json({ message: 'Reminders sent' }, { status: 200 });
}
