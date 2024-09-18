'use server';
import { prisma } from '@/utils/prisma';

export const getQuestions = async () => {
  console.log('Getting questions...');
  try {
    return await prisma.questions.findMany({
      orderBy: {
        questionDate: 'asc',
      },
    });
  } catch (error) {
    console.error('Failed to get questions:', error);
    if (error instanceof Error) return error.message;
  }
};
