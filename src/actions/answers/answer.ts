'use server';
import { Answer } from '@/types/Answers';
import { Question } from '@/types/Questions';
import { User, UserRecord } from '@/types/User';
import { prisma } from '@/utils/prisma';
import { revalidateTag } from 'next/cache';

// Types
interface AnswerQuestionInput {
  questionUid: string;
  answerUid: string;
  userUid: string;
  timeTaken?: number;
}

interface AnswerQuestionResponse {
  correctAnswer: boolean;
  userAnswer: Answer;
  userData: UserRecord | null;
}

// Helper functions
const findQuestion = async (questionUid: string) => {
  const question = await prisma.questions.findUnique({
    where: { uid: questionUid },
  });

  if (!question) {
    throw new Error('Question not found');
  }

  return question;
};

const findExistingAnswer = async (userUid: string, questionUid: string) => {
  return prisma.answers.findFirst({
    where: {
      user: { is: { uid: userUid } },
      question: { is: { uid: questionUid } },
    },
  });
};

const handleStreakUpdates = async (
  tx: any,
  dailyQuestion: boolean,
  {
    userUid,
    shouldIncrementCorrectStreak,
    shouldIncrementTotalStreak,
  }: {
    userUid: string;
    shouldIncrementCorrectStreak: boolean;
    shouldIncrementTotalStreak: boolean;
  }
) => {
  if (!shouldIncrementCorrectStreak && !shouldIncrementTotalStreak) return;

  // check if the question is a daily question or not
  // if its not, exit early
  if (!dailyQuestion) return;

  await tx.users.update({
    where: { uid: userUid },
    data: {
      correctDailyStreak: {
        increment: shouldIncrementCorrectStreak ? 1 : 0,
      },
      totalDailyStreak: {
        increment: shouldIncrementTotalStreak ? 1 : 0,
      },
    },
  });
};

const updateOrCreateAnswer = async (
  tx: any,
  {
    existingAnswer,
    userUid,
    questionUid,
    answerUid,
    correctAnswer,
    timeTaken,
  }: {
    existingAnswer: any;
    userUid: string;
    questionUid: string;
    answerUid: string;
    correctAnswer: boolean;
    timeTaken?: number;
  }
) => {
  if (existingAnswer) {
    // Update if the new answer is correct and the previous one was incorrect, or if the time is better
    if (
      correctAnswer !== existingAnswer.correctAnswer || // Change from incorrect to correct
      (timeTaken !== undefined &&
        timeTaken < (existingAnswer.timeTaken ?? Infinity))
    ) {
      return tx.answers.update({
        where: { uid: existingAnswer.uid },
        data: { userAnswerUid: answerUid, correctAnswer, timeTaken },
      });
    }
    return existingAnswer;
  }

  // Create new answer if none exists
  return tx.answers.create({
    data: {
      user: { connect: { uid: userUid } },
      question: { connect: { uid: questionUid } },
      userAnswerUid: answerUid,
      correctAnswer,
      timeTaken,
    },
  });
};

export async function answerQuestion({
  questionUid,
  answerUid,
  userUid,
  timeTaken,
}: AnswerQuestionInput): Promise<AnswerQuestionResponse> {
  try {
    const question = await findQuestion(questionUid);
    const correctAnswer = question.correctAnswer === answerUid;
    const existingAnswer = await findExistingAnswer(userUid, questionUid);

    // Determine streak updates
    const shouldIncrementCorrectStreak = !existingAnswer && correctAnswer;
    const shouldIncrementTotalStreak = !existingAnswer;

    const { userData, userAnswer } = await prisma.$transaction(async (tx) => {
      // Handle streak updates
      await handleStreakUpdates(tx, question.dailyQuestion, {
        userUid,
        shouldIncrementCorrectStreak,
        shouldIncrementTotalStreak,
      });

      // Get updated user data
      const userData = await tx.users.findUnique({
        where: { uid: userUid },
      });

      // Handle answer creation or update
      const userAnswer = await updateOrCreateAnswer(tx, {
        existingAnswer,
        userUid,
        questionUid,
        answerUid,
        correctAnswer,
        timeTaken,
      });

      return { userData, userAnswer };
    });

    revalidateTag(`leaderboard-${questionUid}`);

    return {
      correctAnswer,
      userAnswer,
      userData,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
