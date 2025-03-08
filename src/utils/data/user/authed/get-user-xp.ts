import { getUser } from '@/actions/user/authed/get-user';
import { prisma } from '@/lib/prisma';

export const getUserXp = async () => {
  const user = await getUser();

  // no user, return default value
  if (!user) return { userXp: 0 };

  return (
    (await prisma.users.findUnique({
      where: {
        uid: user.uid,
      },
      select: {
        userXp: true,
      },
    })) ?? { userXp: 0 }
  );
};
