import { getUser } from '@/actions/user/authed/get-user';
import { prisma } from '@/lib/prisma';

export const getTotalUserAnswers = async () => {
  const user = await getUser();

  const userAnswers = await prisma.answers.count({
    where: { userUid: user?.uid },
  });

  return userAnswers;
};
