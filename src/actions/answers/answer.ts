'use server';
import { Answer } from '@/types/Answers';
import { User, UserRecord } from '@/types/User';
import { prisma } from '@/utils/prisma';

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
  userData: UserRecord | null; // Replace 'any' with your Prisma User type
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
    // Only update if new time is better than existing time
    if (
      timeTaken !== undefined &&
      timeTaken < (existingAnswer.timeTaken ?? Infinity)
    ) {
      return tx.answers.update({
        where: { uid: existingAnswer.uid },
        data: { userAnswerUid: answerUid, correctAnswer, timeTaken },
      });
    }
    return existingAnswer;
  }

  // Create new answer
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
      await handleStreakUpdates(tx, {
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
