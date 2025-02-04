import { type NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { resend } from '@/lib/resend';
import { isAuthorized } from '@/utils/cron';

export const dynamic = 'force-dynamic';

const NUMBER_OF_DAILY_MISSIONS = 3;

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
    const newActiveMissions = await updateDailyMissions();
    await sendDailyMissionsEmail(newActiveMissions);

    return NextResponse.json({ message: 'Daily missions set successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error setting daily missions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function updateDailyMissions() {
  const allMissions = await prisma.mission.findMany();
  if (!allMissions) {
    await resend.emails.send({
      from: 'team@techblitz.dev',
      to: 'team@techblitz.dev',
      subject: 'No missions found',
      html: `<p>No missions found</p>`,
    });
  }

  const currentActiveMissions = await prisma.mission.findMany({ where: { isActive: true } });

  const newMissions = allMissions.filter(
    (mission) => !currentActiveMissions.some((activeMission) => activeMission.uid === mission.uid)
  );

  const newActiveMissions = newMissions
    .sort(() => Math.random() - 0.5)
    .slice(0, NUMBER_OF_DAILY_MISSIONS);

  await prisma.$transaction([
    prisma.mission.updateMany({
      where: { uid: { in: currentActiveMissions.map((mission) => mission.uid) } },
      data: { isActive: false },
    }),
    prisma.mission.updateMany({
      where: { uid: { in: newActiveMissions.map((mission) => mission.uid) } },
      data: { isActive: true },
    }),
  ]);

  return newActiveMissions;
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
