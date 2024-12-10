'use server';
import { StatsChartData } from '@/types/Stats';
import { prisma } from '@/utils/prisma';
import { revalidateTag } from 'next/cache';

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
      createdAt: {
        gte: new Date(from),
        lte: new Date(to)
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

  revalidateTag('statistics');

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

  revalidateTag('statistics');

  return questions;
};

export const getTotalTimeTaken = async (userUid: string) => {
  if (!userUid) {
    return null;
  }

  const answers = await prisma.answers.findMany({
    where: {
      userUid
    }
  });

  const totalTime = answers.reduce((acc, answer) => {
    return acc + (answer.timeTaken || 0);
  }, 0);

  revalidateTag('statistics');

  return totalTime;
};

export const getHighestScoringTag = async (userUid: string) => {
  if (!userUid) {
    return null;
  }

  const answers = await prisma.answers.findMany({
    where: {
      userUid
    },
    include: {
      question: {
        include: {
          tags: {
            include: {
              tag: true
            }
          }
        }
      }
    }
  });

  const tagCounts: Record<string, number> = {};

  answers.forEach((answer) => {
    answer.question.tags.forEach((tag) => {
      const tagName = tag.tag.name;
      tagCounts[tagName] = (tagCounts[tagName] || 0) + 1;
    });
  });

  const highestScoringTag = Object.keys(tagCounts).reduce((acc, tag) => {
    return tagCounts[tag] > tagCounts[acc] ? tag : acc;
  }, '');

  revalidateTag('statistics');

  return {
    tag: highestScoringTag,
    count: tagCounts[highestScoringTag]
  };
};
