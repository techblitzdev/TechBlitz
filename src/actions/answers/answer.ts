'use server';
import { prisma } from '@/utils/prisma';
import { connect } from 'http2';
import uniqid from 'uniqid';

export const answerQuestion = async (opts: {
  questionUid: string;
  answerUid: string;
  userId: string;
}) => {
  console.log('hit the answer endpoint');
  const { questionUid, answerUid, userId } = opts;

  try {
    const question = await prisma.questions.findUnique({
      where: {
        uid: questionUid,
      },
    });

    if (!question) {
      throw new Error('Question not found');
    }

    const correctAnswer = question.correctAnswer === answerUid;

    // Create the answer
    await prisma.answers.create({
      data: {
        user: {
          connect: {
            uid: userId,
          },
        },
        question: {
          connect: {
            uid: questionUid,
          },
        },
        userAnswerUid: answerUid,
        correctAnswer,
      },
    });

    return correctAnswer;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
