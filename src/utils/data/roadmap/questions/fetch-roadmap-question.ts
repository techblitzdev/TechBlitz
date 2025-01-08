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
      answers: true,
      // so we can determine if the user has already answered the question
      userAnswers: true,
    },
  });
};
