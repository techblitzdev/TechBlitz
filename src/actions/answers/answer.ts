'use server';
import { Answer } from '@/types/Answers';
import { prisma } from '@/utils/prisma';

export const answerQuestion = async (opts: {
  questionUid: string;
  answerUid: string;
  userUid: string;
}) => {
  const { questionUid, answerUid, userUid } = opts;

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
            uid: userUid,
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
        uid: userUid,
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
    const userAnswer = (await prisma.answers.create({
      data: {
        user: {
          connect: {
            uid: userUid,
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
    })) as Answer;

    return { correctAnswer, userAnswer };
  } catch (e) {
    console.error(e);
    throw e;
  }
};
