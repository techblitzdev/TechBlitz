import { prisma } from '@/utils/prisma';
import { Question } from '@/types/Questions';

export const getQuestion = async (uid: string) => {
  if (!uid) {
    console.error('Please provide a uid');
    return null;
  }

  try {
    const question = await prisma.questions.findUnique({
      where: {
        uid,
      },
      include: {
        answers: true,
      },
    });

    if (!question) {
      console.error('Question not found');
      return null;
    }

    return question;
  } catch (e) {
    console.error('Error getting question', e);
    return null;
  }
};
