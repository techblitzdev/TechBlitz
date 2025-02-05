'use server';
import { prisma } from '@/lib/prisma';
import { getUser } from '../user/authed/get-user';
import { getUserMissionRecord } from '@/utils/data/missions/get-user-mission-record';

/**
 * When a user signs up for an account, we create them a 'record' of their missions
 *
 * This function will create that record.
 */
export const createUserMissionRecord = async () => {
  // first check the user is authed
  const user = await getUser();
  if (!user) throw new Error('User not found');

  // now check if the user has a mission record
  const userMissionRecord = await getUserMissionRecord();
};
