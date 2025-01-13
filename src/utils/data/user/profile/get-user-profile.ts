import { getUser } from '@/actions/user/authed/get-user';
import { prisma } from '@/lib/prisma';

export const getUserProfile = async () => {
  const user = await getUser();

  // if no user, return null
  if (!user) {
    return null;
  }

  // get the user's profile
  const profile = await prisma.profile.findUnique({
    where: { userUid: user?.uid },
  });

  return profile;
};
