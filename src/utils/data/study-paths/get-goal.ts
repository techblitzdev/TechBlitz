import { getUser } from '@/actions/user/authed/get-user';
import { prisma } from '@/lib/prisma';

export const getStudyPathGoal = async (studyPathUid: string) => {
  const user = await getUser();

  return await prisma.studyPathGoal.findFirst({
    where: {
      studyPathUid,
      AND: {
        userUid: user?.uid,
      },
    },
  });
};
