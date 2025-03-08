'use server';
import { prisma } from '@/lib/prisma';
import { QUESTION_XP } from '@/utils/constants/question-xp';
import { QuestionDifficulty } from '@prisma/client';

interface UserXpMap {
  [userUid: string]: {
    beginner: number;
    easy: number;
    medium: number;
    hard: number;
    totalXp: number;
  };
}

/**
 * A method that fetches all users answers and maps the correct answers to the user xp
 */
export const addUserXp = async () => {
  // Get all correct answers with their associated questions
  const userAnswers = await prisma.answers.findMany({
    where: {
      correctAnswer: true, // Only count correct answers
    },
    include: {
      question: {
        select: {
          difficulty: true,
        },
      },
    },
  });

  // Initialize the XP map
  const userXpMap: UserXpMap = {};

  // Calculate XP for each user based on their correct answers
  userAnswers.forEach((answer) => {
    // Initialize user in map if not exists
    if (!userXpMap[answer.userUid]) {
      userXpMap[answer.userUid] = {
        beginner: 0,
        easy: 0,
        medium: 0,
        hard: 0,
        totalXp: 0,
      };
    }

    // Increment the count for the appropriate difficulty
    const difficulty = answer.question.difficulty.toLowerCase();
    switch (difficulty) {
      case QuestionDifficulty.BEGINNER.toLowerCase():
        userXpMap[answer.userUid].beginner++;
        userXpMap[answer.userUid].totalXp += QUESTION_XP.BEGINNER;
        break;
      case QuestionDifficulty.EASY.toLowerCase():
        userXpMap[answer.userUid].easy++;
        userXpMap[answer.userUid].totalXp += QUESTION_XP.EASY;
        break;
      case QuestionDifficulty.MEDIUM.toLowerCase():
        userXpMap[answer.userUid].medium++;
        userXpMap[answer.userUid].totalXp += QUESTION_XP.MEDIUM;
        break;
      case QuestionDifficulty.HARD.toLowerCase():
        userXpMap[answer.userUid].hard++;
        userXpMap[answer.userUid].totalXp += QUESTION_XP.HARD;
        break;
    }
  });

  // Update each user's XP in the database
  //const updatePromises = Object.entries(userXpMap).map(([userUid, xpData]) => {
  //  return prisma.users.update({
  //    where: { uid: userUid },
  //    data: { userXp: xpData.totalXp },
  //  });
  //});

  // Execute all updates
  //await Promise.all(updatePromises);

  console.log({
    userXpMap,
  });
};
