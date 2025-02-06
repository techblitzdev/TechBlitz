import { prisma } from '@/lib/prisma';
import { getUser } from '@/actions/user/authed/get-user';

/**
 * Method to get the user's mission record (how many missions they have completed / are doing)
 */
export const getUserMissionRecords = async () => {
  const user = await getUser();
  if (!user) throw new Error('User not found');

  // there will be three records for each day (one for each mission)
  return await prisma.userMission.findMany({
    where: {
      userUid: user.uid,
    },
  });
};
