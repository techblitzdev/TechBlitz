'use server';
import { prisma } from '@/lib/prisma';
import { getUser } from '../user/authed/get-user';
import { getDailyMissions } from '@/utils/data/missions/get-daily-missions';

/**
 * When a user signs up for an account, we create them a 'record' of their missions
 *
 * This function will create that record.
 */
export const createUserMissionRecords = async ({ uid }: { uid?: string }) => {
  const userUid = uid ?? (await getUser())?.uid;
  if (!userUid) throw new Error('User not found');

  // Get active missions first
  const missions = await getDailyMissions();
  if (!missions || missions.length === 0) {
    console.log('No active missions found');
    return [];
  }

  // Get existing records
  const existingRecords = await prisma.userMission.findMany({
    where: {
      userUid,
      missionUid: {
        in: missions.map((m) => m.uid),
      },
    },
  });

  // Filter out missions that already have records
  const missionsNeedingRecords = missions.filter(
    (mission) => !existingRecords.some((record) => record.missionUid === mission.uid)
  );

  if (missionsNeedingRecords.length === 0) {
    return existingRecords;
  }

  // Create records for missing missions
  await prisma.userMission.createMany({
    data: missionsNeedingRecords.map((mission) => ({
      userUid,
      missionUid: mission.uid,
      progress: 0,
      status: 'PENDING',
    })),
    skipDuplicates: true,
  });

  // Return all records (existing + new)
  const allRecords = await prisma.userMission.findMany({
    where: {
      userUid,
      missionUid: {
        in: missions.map((m) => m.uid),
      },
    },
  });

  return allRecords;
};
