'use server';
import { prisma } from '@/utils/prisma';

/**
 * Method to get all the question data for the user and return it
 * in a format to display in a chart.
 *
 * We return the data in the following format:
 * [month]: totalQuestions
 */
export const getStatsChartData = async (userUid: string) => {
  if (!userUid) {
    return null;
  }

  const questions = await prisma.answers.findMany({
    where: {
      userUid
    }
  });

  const data: Record<string, number> = {};

  questions.forEach((question) => {
    const month = question.createdAt.toISOString().slice(0, 7);

    if (data[month]) {
      data[month]++;
    } else {
      data[month] = 1;
    }
  });

  return data;
};
