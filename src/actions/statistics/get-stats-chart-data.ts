'use server';
import { StatsChartData } from '@/types/Stats';
import { prisma } from '@/utils/prisma';

/**
 * Method to get all the question data for the user and return it
 * in a format to display in a chart.
 *
 * We return the data in the following format:
 * [month]: { totalQuestions: number, tags: string[], tagCounts: Record<string, number> }
 */
export const getStatsChartData = async (opts: {
  userUid: string;
  to: string;
  from: string;
}) => {
  const { userUid, to, from } = opts;

  if (!userUid) {
    return null;
  }

  const questions = await prisma.answers.findMany({
    where: {
      userUid,
      question: {
        createdAt: {
          gte: new Date(from),
          lte: new Date(to)
        }
      }
    },
    include: {
      question: {
        select: {
          createdAt: true,
          tags: {
            include: {
              tag: true
            }
          }
        }
      }
    }
  });

  const data: StatsChartData = {};

  questions.forEach((answer) => {
    const month = answer.question.createdAt.toISOString().slice(0, 7);
    const tags = answer.question.tags.map((tag) => tag.tag.name);

    if (data[month]) {
      data[month].totalQuestions++;
      tags.forEach((tag) => {
        data[month].tagCounts[tag] = (data[month].tagCounts[tag] || 0) + 1;
      });
    } else {
      const tagCounts: Record<string, number> = {};
      tags.forEach((tag) => {
        tagCounts[tag] = 1;
      });
      data[month] = { totalQuestions: 1, tagCounts };
    }
  });

  return data;
};

/**
 * Gets the total number of questions the user has answered.
 *
 * @param userUid
 * @returns
 */
export const getTotalQuestionCount = async (userUid: string) => {
  if (!userUid) {
    return null;
  }

  const questions = await prisma.answers.count({
    where: {
      userUid
    }
  });

  return questions;
};
