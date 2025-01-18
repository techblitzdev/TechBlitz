import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { resend } from '@/lib/resend';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  console.log('Syncing user streak');

  const isProd = process.env.NODE_ENV === 'production';

  const authHeader = request.headers.get('authorization');
  if (isProd && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  try {
    // Fetch the previous day's question
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const previousDay = yesterday.toISOString().split('T')[0];

    const question = await prisma.questions.findFirst({
      where: {
        questionDate: previousDay,
      },
      select: {
        uid: true,
        correctAnswer: true,
      },
    });

    if (!question) {
      throw new Error('No question found for the previous day');
    }

    // Fetch all answers for the given question UID
    const answers = await prisma.answers.findMany({
      where: {
        questionUid: question.uid,
      },
      select: {
        userUid: true,
        correctAnswer: true,
      },
    });

    // Extract correct answers
    const correctUserIds = answers
      .filter((answer) => answer.correctAnswer)
      .map((answer) => answer.userUid);

    // Fetch all users
    const allUsers = await prisma.users.findMany({
      select: {
        uid: true,
      },
    });

    const allUserIds = allUsers.map((user) => user.uid);

    // Get users who haven't answered correctly
    const correctUserSet = new Set(correctUserIds);
    const usersToUpdate = allUserIds.filter(
      (userId) => !correctUserSet.has(userId)
    );

    // Update streaks for users who haven't answered correctly
    await prisma.streaks.updateMany({
      where: {
        userUid: {
          in: usersToUpdate,
        },
      },
      data: {
        streakStart: null,
        streakEnd: null,
        currentstreakCount: 0,
      },
    });

    console.log({
      totalUsers: allUserIds.length,
      correctAnswers: correctUserIds.length,
      usersToUpdate: usersToUpdate.length,
    });

    await resend.emails.send({
      from: 'team@techblitz.dev',
      to: 'team@techblitz.dev',
      subject: 'Streaks updated successfully',
      html: `<p>Streaks updated successfully</p>
      <p>Total users: ${allUserIds.length}</p>
      <p>Correct answers: ${correctUserIds.length}</p>
      <p>Users updated: ${usersToUpdate.length}</p>`,
    });

    return new Response(
      JSON.stringify({
        message: 'Streaks updated successfully',
        stats: {
          totalUsers: allUserIds.length,
          correctAnswers: correctUserIds.length,
          usersUpdated: usersToUpdate.length,
        },
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}
