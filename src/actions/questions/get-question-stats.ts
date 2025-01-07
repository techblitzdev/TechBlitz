'use server';
import { prisma } from '@/lib/prisma';

/**
 * Method to get the stats for a question.
 *
 * This will return the:
 * - number of submissions
 * - number of correct submissions
 * - percentage of correct submissions
 *
 * @param questionUid
 * @returns
 */
export const getQuestionStats = async (questionUid: string) => {
  const totalSubmissions = await prisma.answers.count({
    where: {
      questionUid,
    },
  });

  const totalCorrectSubmissions = await prisma.answers.count({
    where: {
      questionUid,
      correctAnswer: true,
    },
  });

  const percentageCorrect = Math.round(
    (totalCorrectSubmissions / totalSubmissions) * 100 || 0
  );

  return {
    totalSubmissions,
    totalCorrectSubmissions,
    percentageCorrect,
  };
};
