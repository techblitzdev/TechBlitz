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

    // figure out if the user has already answered this question
    const existingAnswer = await prisma.answers.findFirst({
      where: {
        user: {
          is: {
            uid: userId,
          },
        },
        AND: {
          question: {
            is: {
              uid: questionUid,
            },
          },
        },
      },
    });

    console.log({
      existingAnswer,
      correctAnswer,
    });

    // only increment if this is a new answer,
    const shouldIncrementCorrectDailyStreak = !existingAnswer && correctAnswer;
    const shouldIncrementTotalDailyStreak = !existingAnswer;

    console.log({
      shouldIncrementCorrectDailyStreak,
      shouldIncrementTotalDailyStreak,
    });

    // based on the correct answer, we need to update the daily question streak
    // on the user
    await prisma.users.update({
      where: {
        uid: userId,
      },
      data: {
        correctDailyStreak: {
          increment: shouldIncrementCorrectDailyStreak ? 1 : 0,
        },
        totalDailyStreak: {
          increment: shouldIncrementTotalDailyStreak ? 1 : 0,
        },
      },
    });

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
