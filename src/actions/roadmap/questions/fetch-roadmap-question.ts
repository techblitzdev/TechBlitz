'use server';
import { prisma } from '@/utils/prisma';

export const fetchRoadmapQuestion = async (questionUid: string) => {
  return await prisma.roadmapUserQuestions.findUnique({
    where: {
      uid: questionUid,
    },
    include: {
      answers: true,
      // so we can determine if the user has already answered the question
      userAnswers: true,
    },
  });
};
