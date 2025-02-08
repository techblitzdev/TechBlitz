import { prisma } from '@/lib/prisma';
import { getUser } from '@/actions/user/authed/get-user';

/**
 * Method to get the user's mission record (how many missions they have completed / are doing)
 */
export const getUserMissionRecords = async () => {
  const user = await getUser();
  // silently fail if the user is not found (this page is publicly accessible)
  if (!user) return [];

  // there will be three records for each day (one for each mission)
  return await prisma.userMission.findMany({
    where: {
      userUid: user.uid,
    },
  });
};
