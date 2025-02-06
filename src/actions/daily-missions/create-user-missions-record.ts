'use server';
import { prisma } from '@/lib/prisma';
import { getUser } from '../user/authed/get-user';
import { getUserMissionRecord } from '@/utils/data/missions/get-user-mission-record';
import { uniqueId } from 'lodash';

/**
 * When a user signs up for an account, we create them a 'record' of their missions
 *
 * This function will create that record.
 */
export const createUserMissionRecord = async ({ uid }: { uid?: string }) => {
  const userUid = uid ?? (await getUser())?.uid;
  if (!userUid) throw new Error('User not found');

  // now check if the user has a mission record
  const userMissionRecord = await getUserMissionRecord();

  // if no record exists, create one
  if (!userMissionRecord) {
    const missionUid = uniqueId('user-mission-');

    return await prisma.userMission.create({
      data: {
        userUid,
        missionUid,
      },
    });
  }

  return userMissionRecord;
};
