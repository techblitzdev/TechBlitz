'use server';
import { revalidateTag } from 'next/cache';

import { uniqueId } from 'lodash';
import { createUserMissionRecords } from '../daily-missions/create-user-missions-record';
import { sendStudyPathCompleteEmail } from '../study-paths/send-path-complete-email';

import { getUser } from '../user/authed/get-user';
import { getDailyMissions } from '@/utils/data/missions/get-daily-missions';
import { QUESTION_XP } from '@/utils/constants/question-xp';
import { prisma } from '@/lib/prisma';

import { AnswerDifficulty } from '@prisma/client';
import type { Answer, UserRecord, Question } from '@/types';

// Types
interface AnswerQuestionInput {
  questionUid: string;
  answerUid: string | null;
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

export const findOrCreateUserStreak = async (userUid: string) => {
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
    include: {
      answers: true,
    },
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
  console.log(`Finding existing answer for user ${userUid} and question ${questionUid}`);

  try {
    // First attempt with the relationship query
    const answer = await prisma.answers.findFirst({
      where: {
        userUid: userUid,
        questionUid: questionUid,
      },
    });

    if (answer) {
      console.log(`Found existing answer: ${answer.uid}`);
      return answer;
    }

    console.log('No existing answer found for this user and question');
    return null;
  } catch (error) {
    console.error('Error finding existing answer:', error);
    // If there's an error, return null to create a new answer
    return null;
  }
};

const updateStreakDates = async (userUid: string, currentStreak: any) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastUpdate = new Date(currentStreak.updatedAt);
  lastUpdate.setHours(0, 0, 0, 0);

  const daysDifference = Math.floor(
    (today.getTime() - lastUpdate.getTime()) / (24 * 60 * 60 * 1000)
  );

  // Check if user has answered any question today
  const answeredToday = await prisma.answers.findFirst({
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
  let streakContinued = false;

  // If this is the first answer of the day
  if (!answeredToday) {
    if (daysDifference === 1) {
      // Continue streak regardless of answer correctness
      newCurrentStreak += 1;
      newLongestStreak = Math.max(newCurrentStreak, newLongestStreak);
      streakContinued = true;
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
  await prisma.streaks.update({
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
  await prisma.users.update({
    where: { uid: userUid },
    data: {
      correctDailyStreak: newCurrentStreak,
      totalDailyStreak: currentStreak.totalDailyStreak + (daysDifference === 1 ? 1 : 0),
    },
  });

  return streakContinued;
};

const handleStreakUpdates = async ({ userUid }: { userUid: string }) => {
  // Remove dailyQuestion check to handle streaks for all questions
  const userStreak = await findOrCreateUserStreak(userUid);
  if (!userStreak) return false;

  return await updateStreakDates(userUid, userStreak);
};

const updateOrCreateAnswer = async ({
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
}) => {
  console.log('Updating or creating answer:', {
    existingAnswer: existingAnswer?.uid,
    userUid,
    questionUid,
    answerUid,
    correctAnswer,
    timeTaken,
    environment: process.env.NODE_ENV,
  });

  try {
    if (existingAnswer) {
      // Update if the new answer is correct and the previous one was incorrect, or if the time is better
      if (
        // Change from incorrect to correct
        correctAnswer !== existingAnswer.correctAnswer ||
        // update time taken no matter what
        timeTaken !== undefined
      ) {
        console.log('Updating existing answer:', existingAnswer.uid);
        return prisma.answers.update({
          where: { uid: existingAnswer.uid },
          data: {
            userAnswerUid: answerUid,
            correctAnswer,
            timeTaken,
          },
        });
      }
      console.log('Using existing answer without changes:', existingAnswer.uid);
      return existingAnswer;
    }

    // Create new answer if none exists
    console.log('Creating new answer for question:', questionUid);
    const newAnswer = await prisma.answers.create({
      data: {
        user: { connect: { uid: userUid } },
        question: { connect: { uid: questionUid } },
        userAnswerUid: answerUid,
        correctAnswer,
        timeTaken,
      },
    });

    console.log('New answer created:', newAnswer.uid);
    return newAnswer;
  } catch (error) {
    console.error('Error saving answer to database:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to save answer to database: ${errorMessage}`);
  }
};

/**
 * Updates the user's XP based on question difficulty and correctness
 *
 * @param userUid - The user's UID
 * @param question - The question object
 * @param isNewCorrectAnswer - Whether this is a new correct answer
 * @param isNewAnswer - Whether this is a new answer attempt
 */
const updateUserXp = async (
  userUid: string,
  question: Question,
  isNewCorrectAnswer: boolean,
  isNewAnswer: boolean
) => {
  // If it's not a new answer attempt, don't add XP
  if (!isNewAnswer) return;

  let xpToAdd = 0;

  if (isNewCorrectAnswer) {
    // Add full XP for correct answers
    xpToAdd = QUESTION_XP[question.difficulty] || 5;
  } else {
    // Add 2XP for incorrect answers
    xpToAdd = 2;
  }

  await prisma.users.update({
    where: { uid: userUid },
    data: {
      userXp: {
        increment: xpToAdd,
      },
    },
  });
};

export async function answerQuestion({
  questionUid,
  answerUid,
  timeTaken,
  allPassed,
  studyPathSlug,
}: AnswerQuestionInput): Promise<AnswerQuestionResponse> {
  console.log('answerQuestion called with:', {
    questionUid,
    answerUid,
    timeTaken,
    allPassed,
    studyPathSlug,
  });

  const user = await getUser();
  if (!user) {
    console.error('User not found when submitting answer');
    throw new Error('User not found');
  }

  const userUid = user.uid;
  console.log('User ID:', userUid);

  // if no answerUid, then we are submitting a coding challenge
  if (!answerUid) {
    answerUid = uniqueId();
    console.log('Generated answerUid for coding challenge:', answerUid);
  }

  try {
    const question = await findQuestion(questionUid);
    const questionType = question.questionType;
    console.log('Question type:', questionType);

    let correctAnswer = false;
    if (questionType === 'CODING_CHALLENGE') {
      correctAnswer = allPassed || false;
    } else {
      correctAnswer = question.correctAnswer === answerUid;
    }
    console.log('Answer is correct:', correctAnswer);

    const existingAnswer = await findExistingAnswer(userUid, questionUid);
    const isNewCorrectAnswer = correctAnswer && (!existingAnswer || !existingAnswer.correctAnswer);
    const isNewAnswer = !existingAnswer;
    console.log('Answer status:', {
      isNewAnswer,
      isNewCorrectAnswer,
      existingAnswerId: existingAnswer?.uid,
    });

    let streakContinued = false;
    // Only update streaks if this is a new answer
    if (!existingAnswer) {
      streakContinued = await handleStreakUpdates({
        userUid,
      });
      console.log('Streak continued:', streakContinued);
    }

    // Handle answer creation or update
    console.log('Saving answer to database...');
    const userAnswer = await updateOrCreateAnswer({
      existingAnswer,
      userUid,
      questionUid,
      answerUid,
      correctAnswer,
      timeTaken,
    });
    console.log('Answer saved successfully:', userAnswer.uid);

    // Update user XP based on answer correctness
    await updateUserXp(userUid, question, isNewCorrectAnswer, isNewAnswer);
    console.log('User XP updated');

    // if this is a study path, update the study path progress
    if (studyPathSlug) {
      console.log('Updating study path progress for slug:', studyPathSlug);
      await updateStudyPathProgress({
        userUid,
        studyPathSlug,
      });
      console.log('Study path progress updated');
    }

    // handle the updating of daily missions on the user
    await updateUserDailyMissions({ userAnswer, streakContinued });
    console.log('Daily missions updated');

    // Get updated user data
    const userData = await prisma.users.findUnique({
      where: { uid: userUid },
    });

    // revalidate leaderboard
    revalidateTag(`leaderboard-${questionUid}`);
    // revalidate if the user has answered the streak
    revalidateTag(`user-has-answered-daily-question-${questionUid}`);
    // revalidate the user's statistics
    revalidateTag(`statistics`);
    console.log('Cache tags revalidated');

    return {
      correctAnswer,
      userAnswer,
      userData: userData as UserRecord | null,
    };
  } catch (error) {
    console.error('Error in answerQuestion:', error);
    throw error;
  }
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

  if (!studyPath || !studyPath.uid) {
    throw new Error('Study path not found');
  }

  let questionSlugs: string[] = [];

  /** study paths can either have questionSlugs, or 'overviewData' */
  const hasOverviewData = 'overviewData' in studyPath;

  if (hasOverviewData) {
    // get all the question slugs from the overview data (if it exists)
    questionSlugs = Object.values(studyPath.overviewData || {}).flatMap(
      (section: any) => section.questionSlugs || []
    );
  } else {
    // otherwise, this is a legacy study path and we can just use the questionSlugs
    // type assertion to ensure TypeScript knows questionSlugs exists
    questionSlugs = (studyPath as any).questionSlugs || [];
  }

  // If the study path has no questions, just return
  if (questionSlugs.length === 0) {
    console.error('Study path has no question slugs');
    return;
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
          in: studyPath.questionSlugs,
        },
      },
      userUid,
    },
  });

  // Calculate the percentage with validation
  let percentageCompleted = 0;
  if (studyPath.questionSlugs.length > 0 && completedQuestions.length > 0) {
    percentageCompleted = Math.min(
      Math.round((completedQuestions.length / studyPath.questionSlugs.length) * 100),
      100 // Cap at 100%
    );
  }

  // Ensure we're passing a valid number to the database
  if (isNaN(percentageCompleted) || !isFinite(percentageCompleted)) {
    console.error('Invalid percentage calculated:', percentageCompleted);
    percentageCompleted = 0;
  }

  // Log the calculation for debugging
  console.log(
    `Study path progress: ${completedQuestions.length} / ${studyPath.questionSlugs.length} = ${percentageCompleted}%`
  );

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

    try {
      // Try to update the user's roadmap goal completion data
      await prisma.studyPathGoal.update({
        where: {
          userUid_studyPathUid: {
            userUid,
            studyPathUid: studyPath.uid,
          },
        },
        data: {
          completed: true,
          completedAt: new Date(),
          isActive: false, // completed
        },
      });
    } catch (error) {
      console.error('Error updating study path goal:', error);
      // Continue execution even if this fails, it's not critical
    }

    try {
      // send the user an email
      await sendStudyPathCompleteEmail({
        studyPathUid: studyPath.uid,
      });
    } catch (error) {
      console.error('Error sending study path completion email:', error);
      // Continue execution even if this fails, it's not critical
    }
  }

  // Revalidate the study path cache
  revalidateTag(`study-path-${studyPathSlug}`);
};

const updateUserDailyMissions = async ({
  userAnswer,
  streakContinued,
}: {
  userAnswer: Answer;
  streakContinued: boolean;
}) => {
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
    if (mission.type === 'QUESTION_CORRECT' && userAnswer.correctAnswer === false) {
      console.log('question correct but answer is incorrect');
      continue;
    }

    if (mission.type === 'STREAK_MAINTAINED' && !streakContinued) {
      console.log('streak maintained but streak not continued');
      continue;
    }

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
      data: {
        progress: Number(userMissionRecord.progress) + 1 || 1,
        status:
          Number(userMissionRecord.progress) + 1 === mission.requirements ? 'COMPLETED' : 'PENDING',
      },
    });
  }
};
