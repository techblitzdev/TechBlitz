import { getUser } from '@/actions/user/authed/get-user';
import { prisma } from '@/lib/prisma';

export const userHasAnsweredAnyQuestion = async () => {
  const user = await getUser();

  if (!user) {
    return false;
  }

  const userAnswers = await prisma.answers.findMany({
    where: {
      userUid: user.uid,
    },
  });

  return userAnswers.length > 0;
};
