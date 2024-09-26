'use server';
import { prisma } from '@/utils/prisma';

export const answerQuestion = async (opts: {
  questionUid: string;
  answerUid: string;
}) => {
  const { questionUid, answerUid } = opts;
  try {
    // check if the answerUid is the correct answer
    // if it is, return true
    // if it is not, return false
    const question = await prisma.questions.findUnique({
      where: {
        uid: questionUid,
      },
    });

    if (!question) {
      throw new Error('Question not found');
    }

    return question.correctAnswer === answerUid ? true : false;
  } catch (e) {
    console.error(e);
  }
};
