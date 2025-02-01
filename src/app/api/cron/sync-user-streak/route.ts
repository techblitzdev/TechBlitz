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
    // Get yesterday's date range
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const endOfYesterday = new Date(yesterday);
    endOfYesterday.setHours(23, 59, 59, 999);

    // Fetch all users who answered any question yesterday
    const usersWhoAnswered = await prisma.answers.findMany({
      where: {
        createdAt: {
          gte: yesterday,
          lte: endOfYesterday,
        },
      },
      select: {
        userUid: true,
      },
      distinct: ['userUid'],
    });

    // Get all users
    const allUsers = await prisma.users.findMany({
      select: {
        uid: true,
      },
    });

    const allUserIds = allUsers.map((user) => user.uid);
    const activeUserIds = usersWhoAnswered.map((user) => user.userUid);

    // Get users who haven't answered any question
    const activeUserSet = new Set(activeUserIds);
    const usersToUpdate = allUserIds.filter((userId) => !activeUserSet.has(userId));

    // Update streaks for users who haven't answered any question
    await prisma.streaks.updateMany({
      where: {
        userUid: {
          in: usersToUpdate,
        },
      },
      data: {
        streakStart: yesterday,
        streakEnd: yesterday,
        currentstreakCount: 0,
      },
    });

    console.log({
      totalUsers: allUserIds.length,
      activeUsers: activeUserIds.length,
      usersToUpdate: usersToUpdate.length,
    });

    await resend.emails.send({
      from: 'team@techblitz.dev',
      to: 'team@techblitz.dev',
      subject: 'Streaks updated successfully',
      html: `<p>Streaks updated successfully</p>
      <p>Total users: ${allUserIds.length}</p>
      <p>Active users: ${activeUserIds.length}</p>
      <p>Users updated: ${usersToUpdate.length}</p>`,
    });

    return new Response(
      JSON.stringify({
        message: 'Streaks updated successfully',
        stats: {
          totalUsers: allUserIds.length,
          activeUsers: activeUserIds.length,
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
