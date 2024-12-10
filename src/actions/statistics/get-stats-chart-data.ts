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
  step: 'month' | 'week' | 'day';
}) => {
  const { userUid, to, from, step } = opts;

  if (!userUid) {
    return null;
  }

  const questions = await prisma.answers.findMany({
    where: {
      userUid,
      createdAt: {
        gte: new Date(from),
        lte: new Date('2024-12-31')
      }
    },
    include: {
      question: {
        select: {
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

  // Helper function to format day label
  const formatDayLabel = (date: Date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];

    const dayOfWeek = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate();

    return `${dayOfWeek}, ${month} ${dayOfMonth}`;
  };

  questions.forEach((answer) => {
    let key: string;
    switch (step) {
      case 'month':
        key = answer.createdAt.toISOString().slice(0, 7);
        break;
      case 'week':
        // Get the start of the week (first day of the week)
        const weekStart = new Date(answer.createdAt);
        weekStart.setDate(
          answer.createdAt.getDate() - answer.createdAt.getDay()
        );
        key = weekStart.toISOString().slice(0, 10);
        break;
      case 'day':
        key = formatDayLabel(answer.createdAt);
        break;
    }

    const tags = answer.question.tags.map((tag) => tag.tag.name);

    if (data[key]) {
      data[key].totalQuestions++;
      tags.forEach((tag) => {
        data[key].tagCounts[tag] = (data[key].tagCounts[tag] || 0) + 1;
        // Ensure tags array is updated
        if (!data[key].tags.includes(tag)) {
          data[key].tags.push(tag);
        }
      });
    } else {
      const tagCounts: Record<string, number> = {};
      tags.forEach((tag) => {
        tagCounts[tag] = 1;
      });
      data[key] = {
        totalQuestions: 1,
        tagCounts,
        tags: [...tags]
      };
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
