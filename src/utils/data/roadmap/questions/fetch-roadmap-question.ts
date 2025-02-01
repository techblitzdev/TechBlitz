import { getUser } from '@/actions/user/authed/get-user';
import { prisma } from '@/lib/prisma';

export const fetchRoadmapQuestion = async (questionUid: string) => {
  const user = await getUser();
  if (!user) {
    throw new Error('User not found');
  }

  return await prisma.roadmapUserQuestions.findUnique({
    where: {
      uid: questionUid,
      roadmap: {
        userUid: user.uid,
      },
    },
    include: {
      answers: {
        include: {
          question: true,
        },
      },
      userAnswers: true,
      roadmap: true,
    },
  });
};
