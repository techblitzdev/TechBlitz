'use server';
import { prisma } from '@/utils/prisma';

export const getQuestions = async () => {
  console.log('Getting questions...');
  try {
    // limit to 10 posts per page
    return await prisma.questions.findMany({
      take: 10,
      orderBy: {
        questionDate: 'desc',
      },
      include: {
        answers: true,
      },
    });
  } catch (error) {
    console.error('Failed to get questions:', error);
    if (error instanceof Error) return error.message;
  }
};
