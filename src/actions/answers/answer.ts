'use server';
import { prisma } from '@/utils/prisma';
import { connect } from 'http2';
import uniqid from 'uniqid';

export const answerQuestion = async (opts: {
  questionUid: string;
  answerUid: string;
  userId: string;
}) => {
  const { questionUid, answerUid, userId } = opts;

  try {
    // find the question the user is trying to answer
    const question = await prisma.questions.findUnique({
      where: {
        uid: questionUid,
      },
    });

    if (!question) {
      throw new Error('Question not found');
    }
    // determine if the user's answer is correct by comparing the answer
    // uid to the question.correctAnswer uid
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

    // only increment if this is a new answer,
    const shouldIncrementCorrectDailyStreak = !existingAnswer && correctAnswer;
    const shouldIncrementTotalDailyStreak = !existingAnswer;

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
    const userAnswer = await prisma.answers.create({
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

    return { correctAnswer, userAnswer };
  } catch (e) {
    console.error(e);
    throw e;
  }
};
