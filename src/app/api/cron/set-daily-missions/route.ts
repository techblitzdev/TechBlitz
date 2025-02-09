import { type NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { resend } from '@/lib/resend';
import { isAuthorized } from '@/utils/cron';
import { Mission } from '@prisma/client';
import { getDailyMissions } from '@/utils/data/missions/get-daily-missions';

export const dynamic = 'force-dynamic';

//const NUMBER_OF_DAILY_MISSIONS = 3;

/**
 * This cron job sets the daily missions for the users
 * It will be run every day at 00:00 UTC
 */
export async function GET(request: NextRequest) {
  console.log('setting daily missions');

  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const newActiveMissions = await getDailyMissions();

    // reset the user missions
    await resetUserMissions({ dailyMissions: newActiveMissions });
    // send the email to the team
    await sendDailyMissionsEmail(newActiveMissions);

    return NextResponse.json({ message: 'Daily missions set successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error setting daily missions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper functions moved outside of exports
async function resetUserMissions({ dailyMissions }: { dailyMissions: Mission[] }) {
  const users = await prisma.users.findMany();
  // Delete all existing user missions for these mission UIDs
  await prisma.userMission.deleteMany();

  // Create new user missions for these mission UIDs
  await prisma.userMission.createMany({
    data: users.flatMap((user) =>
      dailyMissions.map((mission) => ({
        missionUid: mission.uid,
        progress: 0,
        userUid: user.uid,
      }))
    ),
  });
}

async function sendDailyMissionsEmail(activeMissions: any[]) {
  await resend.emails.send({
    from: 'Cron Job <team@techblitz.dev>',
    to: 'team@techblitz.dev',
    subject: 'Daily missions set successfully',
    html: `
      <p>Daily missions set successfully</p>
      <p>Active missions: ${activeMissions.length}</p>
      <p>Missions:</p>
      ${activeMissions.map((mission) => `<p>${mission.title}</p>`).join('\n')}
    `,
  });
}
