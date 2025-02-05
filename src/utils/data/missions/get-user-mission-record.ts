import { prisma } from '@/lib/prisma';
import { getUser } from '@/actions/user/authed/get-user';

/**
 * Method to get the user's mission record (how many missions they have completed / are doing)
 */
export const getUserMissionRecord = async () => {
  const user = await getUser();
  if (!user) throw new Error('User not found');

  return await prisma.userMission.findUnique({
    where: {
      userUid: user.uid,
    },
  });
};
