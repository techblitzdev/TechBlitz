'use server';
import { prisma } from '@/lib/prisma';
import { getUser } from '../user/authed/get-user';
import { getUserMissionRecords } from '@/utils/data/missions/get-user-mission-record';
import { getDailyMissions } from '@/utils/data/missions/get-daily-missions';

/**
 * When a user signs up for an account, we create them a 'record' of their missions
 *
 * This function will create that record.
 */
export const createUserMissionRecords = async ({ uid }: { uid?: string }) => {
  const userUid = uid ?? (await getUser())?.uid;
  if (!userUid) throw new Error('User not found');

  // now check if the user has a mission record
  const userMissionRecords = await getUserMissionRecords();
  const missions = await getDailyMissions();

  // if no record exists, create one
  if (userMissionRecords.length === 0) {
    // create a record for each mission
    const missionRecords = await Promise.all(
      missions.map((mission) =>
        prisma.userMission.create({
          data: {
            userUid,
            missionUid: mission.uid,
          },
        })
      )
    );

    return missionRecords;
  }

  return userMissionRecords;
};
