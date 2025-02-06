'use server';
import { Answer } from '@/types/Answers';
import { UserRecord } from '@/types/User';
import { prisma } from '@/lib/prisma';
import { revalidateTag } from 'next/cache';
import { AnswerDifficulty } from '@prisma/client';
import { uniqueId } from 'lodash';
import { getUser } from '../user/authed/get-user';
import { getDailyMissions } from '@/utils/data/missions/get-daily-missions';
import { getUserMissionRecords } from '@/utils/data/missions/get-user-mission-record';
import { createUserMissionRecords } from '../daily-missions/create-user-missions-record';

// Types
interface AnswerQuestionInput {
  questionUid: string;
  answerUid: string | null;
  userUid: string;
  timeTaken?: number;
  allPassed?: boolean;
  // for handling study path progress
  studyPathSlug?: string;
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

const updateStreakDates = async (tx: any, userUid: string, currentStreak: any) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastUpdate = new Date(currentStreak.updatedAt);
  lastUpdate.setHours(0, 0, 0, 0);

  const daysDifference = Math.floor(
    (today.getTime() - lastUpdate.getTime()) / (24 * 60 * 60 * 1000)
  );

  // Check if user has answered any question today
  const answeredToday = await tx.answers.findFirst({
    where: {
      userUid,
      createdAt: {
        gte: today,
      },
    },
  });

  let newStreakStart = new Date(currentStreak.streakStart);
  const newStreakEnd = new Date();
  let newCurrentStreak = currentStreak.currentstreakCount;
  let newLongestStreak = currentStreak.longestStreak;

  // If this is the first answer of the day
  if (!answeredToday) {
    if (daysDifference === 1) {
      // Continue streak
      newCurrentStreak += 1;
      newLongestStreak = Math.max(newCurrentStreak, newLongestStreak);
    } else if (daysDifference > 1) {
      // Break streak - more than one day gap
      newCurrentStreak = 1;
      newStreakStart = new Date();
    } else if (daysDifference === 0) {
      // Same day, don't increment streak but maintain it
      newCurrentStreak = Math.max(1, newCurrentStreak);
    }
  }

  // Update streak
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

  // Update user's streak counts
  await tx.users.update({
    where: { uid: userUid },
    data: {
      correctDailyStreak: newCurrentStreak,
      totalDailyStreak: currentStreak.totalDailyStreak + (daysDifference === 1 ? 1 : 0),
    },
  });
};

const handleStreakUpdates = async (
  tx: any,
  {
    userUid,
  }: {
    userUid: string;
  }
) => {
  // Remove dailyQuestion check to handle streaks for all questions
  const userStreak = await findOrCreateUserStreak(userUid);
  if (!userStreak) return;

  await updateStreakDates(tx, userUid, userStreak);
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
  studyPathSlug,
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
      await handleStreakUpdates(tx, {
        userUid,
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

    // if this is a study path, update the study path progress
    if (studyPathSlug) {
      await updateStudyPathProgress({
        userUid,
        studyPathSlug,
      });
    }

    // handle the updating of daily missions on the user
    await updateUserDailyMissions({ userAnswer });

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
  difficulty: AnswerDifficulty,
  isRoadmapQuestion: boolean
) {
  if (isRoadmapQuestion) {
    await prisma.roadmapUserQuestionsUserAnswers.update({
      where: { uid: answerUid },
      data: { difficulty },
    });
  } else {
    await prisma.answers.update({
      where: { uid: answerUid },
      data: { difficulty },
    });
  }
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

const updateStudyPathProgress = async ({
  userUid,
  studyPathSlug,
}: {
  userUid: string;
  studyPathSlug: string;
}) => {
  // update the study path progress
  const studyPath = await prisma.studyPath.findUnique({
    where: { slug: studyPathSlug },
  });

  if (!studyPath) {
    throw new Error('Study path not found');
  }

  // Check if user is enrolled in study path, if not enroll them
  const userStudyPath = await prisma.userStudyPath.findUnique({
    where: {
      userUid_studyPathUid: {
        userUid,
        studyPathUid: studyPath.uid,
      },
    },
  });

  if (!userStudyPath) {
    await prisma.userStudyPath.create({
      data: {
        userUid,
        studyPathUid: studyPath.uid,
        progress: 0,
      },
    });
  }

  const completedQuestions = await prisma.answers.findMany({
    where: {
      question: {
        slug: {
          in: studyPath?.questionSlugs ?? [],
        },
      },
      userUid,
    },
  });

  // get the percentage of questions that have been completed
  const percentageCompleted =
    (completedQuestions.length / (studyPath?.questionSlugs?.length ?? 0)) * 100;

  // update with the percentage completed
  await prisma.userStudyPath.update({
    where: {
      userUid_studyPathUid: {
        userUid,
        studyPathUid: studyPath.uid,
      },
    },
    data: { progress: percentageCompleted },
  });

  // if the percentage completed is 100%, then we need to update the user's study path status
  if (percentageCompleted === 100) {
    await prisma.userStudyPath.update({
      where: {
        userUid_studyPathUid: {
          userUid,
          studyPathUid: studyPath.uid,
        },
      },
      data: {
        completedAt: new Date(),
      },
    });
  }

  revalidateTag(`study-path-${studyPathSlug}`);
};

const updateUserDailyMissions = async ({ userAnswer }: any) => {
  const user = await getUser();
  if (!user) {
    throw new Error('User not found');
  }

  const activeMissions = await getDailyMissions();
  if (!activeMissions?.length) {
    return;
  }

  // Ensure user has mission records
  const userMissionRecords = await createUserMissionRecords({ uid: user.uid });
  if (!userMissionRecords?.length) {
    console.error('Failed to create/get user mission records');
    return;
  }

  // Rest of the mission update logic...
  const missions = activeMissions.filter((mission) => {
    return (
      mission.type === 'QUESTION_ANSWERED' ||
      mission.type === 'STREAK_MAINTAINED' ||
      mission.type === 'QUESTION_CORRECT'
    );
  });

  // silent fail if no mission is found (may not be any missions for the day)
  if (!missions) {
    return;
  }

  // loop through all missions, and update the mission record
  for (const mission of missions) {
    // find the mission record
    const userMissionRecord = userMissionRecords.find(
      (record) => record.missionUid === mission.uid
    );
    // silent fail if the mission record is not found
    if (!userMissionRecord) {
      continue;
    }

    // check if the mission is completed
    if (userMissionRecord.status === 'COMPLETED') {
      continue;
    }

    // update the mission record
    await prisma.userMission.update({
      where: { uid: userMissionRecord.uid },
      data: { progress: Number(userMissionRecord.progress) + 1 || 1 },
    });
    // if the mission is completed, update the status
    if (
      userMissionRecord.progress &&
      mission.requirements &&
      userMissionRecord.progress === mission.requirements
    ) {
      await prisma.userMission.update({
        where: { uid: userMissionRecord.uid },
        data: { status: 'COMPLETED' },
      });
    }
  }
};
