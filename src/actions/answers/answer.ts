'use server';
import { Answer } from '@/types/Answers';
import { UserRecord } from '@/types/User';
import { prisma } from '@/lib/prisma';
import { revalidateTag } from 'next/cache';
import { AnswerDifficulty } from '@prisma/client';
import { uniqueId } from 'lodash';
import { getUser } from '../user/authed/get-user';

// Types
interface AnswerQuestionInput {
  questionUid: string;
  answerUid: string | null;
  userUid: string;
  timeTaken?: number;
  allPassed?: boolean;
}

interface AnswerQuestionResponse {
  correctAnswer: boolean;
  userAnswer: Answer;
  userData: UserRecord | null;
}

const findOrCreateUserStreak = async (userUid: string) => {
  const streak = await prisma.streaks.findUnique({
    where: { userUid },
  });

  if (streak) return streak;

  return await prisma.streaks.create({
    data: {
      userUid,
      streakStart: new Date(),
      streakEnd: new Date(),
      createdAt: new Date(),
      currentstreakCount: 0,
      longestStreak: 0,
      updatedAt: new Date(),
    },
  });
};

const findQuestion = async (questionUid: string) => {
  const question = await prisma.questions.findUnique({
    where: { uid: questionUid },
  });

  if (!question) {
    throw new Error('Question not found');
  }

  return question;
};

/**
 * Getting an existing answer for a question based on the user and question uid
 *
 * @param userUid
 * @param questionUid
 * @returns
 */
const findExistingAnswer = async (userUid: string, questionUid: string) => {
  console.log('hit findExistingAnswer');
  return prisma.answers.findFirst({
    where: {
      user: { is: { uid: userUid } },
      question: { is: { uid: questionUid } },
    },
  });
};

const updateStreakDates = async (
  tx: any,
  userUid: string,
  currentStreak: any,
  correctAnswer: boolean
) => {
  console.log('hit updateStreakDates');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastUpdate = new Date(currentStreak.updatedAt);
  lastUpdate.setHours(0, 0, 0, 0);

  const isNextDay = today.getTime() - lastUpdate.getTime() === 86400000; // 24 hours in ms
  const isToday = today.getTime() === lastUpdate.getTime();

  let newStreakStart = new Date(currentStreak.streakStart);
  let newStreakEnd = new Date();
  let newCurrentStreak = currentStreak.currentstreakCount;
  let newLongestStreak = currentStreak.longestStreak;

  if (correctAnswer && (isNextDay || isToday)) {
    // Continue the streak
    newCurrentStreak += 1;
    newLongestStreak = Math.max(newCurrentStreak, newLongestStreak);
    // Update end date to today
    newStreakEnd = new Date();
  } else if (!isToday) {
    // Break in streak (more than one day gap)
    if (correctAnswer) {
      // Start new streak
      newCurrentStreak = 1;
      // Reset start date to today
      newStreakStart = new Date();
      newStreakEnd = new Date();
    } else {
      // Wrong answer after gap
      newCurrentStreak = 0;
      // Reset start date
      newStreakStart = new Date();
      newStreakEnd = new Date();
    }
  } else if (!correctAnswer) {
    // Wrong answer today
    newCurrentStreak = 0;
    // Reset start date
    newStreakStart = new Date();
    newStreakEnd = new Date();
  }

  // If it's the same day and correct, keep current streak (no change)
  await tx.streaks.update({
    where: { userUid },
    data: {
      streakStart: newStreakStart,
      streakEnd: newStreakEnd,
      currentstreakCount: newCurrentStreak,
      longestStreak: newLongestStreak,
      updatedAt: new Date(),
    },
  });

  await tx.users.update({
    where: { uid: userUid },
    data: {
      correctDailyStreak: newCurrentStreak,
      totalDailyStreak:
        currentStreak.totalDailyStreak +
        (isNextDay || (!isToday && correctAnswer) ? 1 : 0),
    },
  });
};

const handleStreakUpdates = async (
  tx: any,
  dailyQuestion: boolean,
  {
    userUid,
    correctAnswer,
  }: {
    userUid: string;
    correctAnswer: boolean;
  }
) => {
  if (!dailyQuestion) return;

  const userStreak = await findOrCreateUserStreak(userUid);
  if (!userStreak) return;

  await updateStreakDates(tx, userUid, userStreak, correctAnswer);
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
    answerUid?: string;
    correctAnswer: boolean;
    timeTaken?: number;
  }
) => {
  if (existingAnswer) {
    // Update if the new answer is correct and the previous one was incorrect, or if the time is better
    if (
      // Change from incorrect to correct
      correctAnswer !== existingAnswer.correctAnswer ||
      // update time taken no matter what
      timeTaken !== undefined
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
  allPassed,
}: AnswerQuestionInput): Promise<AnswerQuestionResponse> {
  // if no answerUid, then we are submitting a coding challenge
  if (!answerUid) {
    answerUid = uniqueId();
  }

  const question = await findQuestion(questionUid);

  const questionType = question.questionType;

  let correctAnswer = false;
  if (questionType === 'CODING_CHALLENGE') {
    correctAnswer = allPassed || false;
  } else {
    correctAnswer = question.correctAnswer === answerUid;
  }

  const existingAnswer = await findExistingAnswer(userUid, questionUid);

  const { userData, userAnswer } = await prisma.$transaction(async (tx) => {
    // Only update streaks if this is a new answer
    if (!existingAnswer) {
      await handleStreakUpdates(tx, question.dailyQuestion, {
        userUid,
        correctAnswer,
      });
    }

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

  // revalidate leaderboard
  revalidateTag(`leaderboard-${questionUid}`);
  // revalidate if the user has answered the streak
  revalidateTag(`user-has-answered-daily-question-${questionUid}`);
  // revalidate the user's statistics
  revalidateTag(`statistics`);

  return {
    correctAnswer,
    userAnswer,
    userData: userData as UserRecord | null,
  };
}

/**
 * Allows the user to specify how hard they found a question.
 * We will use this to serve more personalized questions to the user.
 *
 * @param answerUid - The uid of the answer to update.
 * @param difficulty - The difficulty the user found the question.
 */
export async function updateAnswerDifficulty(
  answerUid: string,
  difficulty: AnswerDifficulty
) {
  await prisma.answers.update({
    where: { uid: answerUid },
    data: { difficulty },
  });
}

/**
 * Updates the difficulty of all answers for a given question.
 *
 * @param questionUid - The uid of the question to update.
 * @param difficulty - The difficulty to set for the answers.
 */
export async function updateAnswerDifficultyByQuestionUid(
  questionUid: string,
  difficulty: AnswerDifficulty
) {
  const user = await getUser();

  if (!user) {
    throw new Error('User not found');
  }

  await prisma.answers.updateMany({
    where: {
      questionUid,
      AND: {
        userUid: user.uid,
      },
    },
    data: { difficulty },
  });
}
