import { StatsChartData, StatsSteps } from '@/types/Stats';
import { prisma } from '@/lib/prisma';
import { getRange } from '@/utils/stats';
import { revalidateTag } from 'next/cache';

/**
 * Method to get all the question data for the user and return it
 * in a format to display in a chart.
 *
 * We return the data in the following format:
 * [key]: { totalQuestions: number, tags: string[], tagCounts: Record<string, number> }
 */
const getStatsChartData = async (opts: {
  userUid: string;
  to: string;
  from: StatsSteps | 'all';
  step?: 'month' | 'week' | 'day';
  separateByDifficulty?: boolean;
  includeDifficultyData?: boolean;
}) => {
  const { userUid, to, from, step, separateByDifficulty, includeDifficultyData } = opts;

  if (!userUid) {
    return null;
  }

  const toDate = new Date(to);
  // If 'all' is specified, use a very old date to get all data
  const fromDate = from === 'all' ? new Date(0) : getRange(from);

  const questions = await prisma.answers.findMany({
    where: {
      userUid,
      createdAt: {
        gte: fromDate,
        lte: toDate,
      },
    },
    include: {
      question: {
        select: {
          tags: {
            include: {
              tag: true,
            },
          },
          difficulty: includeDifficultyData, // only include difficulty if requested
        },
      },
    },
  });

  // If no step is provided, return ungrouped data
  if (!step) {
    // Create an overall stats object
    const ungroupedData: StatsChartData = {
      all: {
        totalQuestions: 0,
        tagCounts: {},
        tags: [],
        difficulties: includeDifficultyData
          ? {
              BEGINNER: 0,
              EASY: 0,
              MEDIUM: 0,
              HARD: 0,
            }
          : undefined,
      },
    };

    // Process all questions without time-based grouping
    questions.forEach((answer) => {
      const tags = answer.question.tags.map((tag) => tag.tag.name);
      ungroupedData['all'].totalQuestions++;

      // Track difficulty if needed
      if (
        includeDifficultyData &&
        ungroupedData['all'].difficulties &&
        answer.question.difficulty
      ) {
        const difficulty = answer.question.difficulty;
        if (ungroupedData['all'].difficulties[difficulty] !== undefined) {
          ungroupedData['all'].difficulties[difficulty]!++;
        }
      }

      // Process tags
      tags.forEach((tag) => {
        ungroupedData['all'].tagCounts[tag] = (ungroupedData['all'].tagCounts[tag] || 0) + 1;
        if (!ungroupedData['all'].tags.includes(tag)) {
          ungroupedData['all'].tags.push(tag);
        }
      });
    });

    return ungroupedData;
  }

  const data: StatsChartData = {};

  // Generate all dates in range, excluding the fromDate
  const currentDate = new Date(fromDate);
  // Start from the day after fromDate
  currentDate.setDate(currentDate.getDate() + 1);

  while (currentDate <= toDate) {
    let key: string;
    const year = currentDate.getFullYear();

    switch (step) {
      case 'month':
        key = `${currentDate.toISOString().slice(0, 7)},${year}`;
        break;
      case 'week':
        const weekStart = new Date(currentDate);
        weekStart.setDate(currentDate.getDate() - currentDate.getDay());
        key = `${weekStart.toISOString().slice(0, 10)},${year}`;
        break;
      case 'day':
        key = `${currentDate.toISOString().slice(0, 10)},${year}`;
        break;
    }

    data[key] = {
      totalQuestions: 0,
      tagCounts: {},
      tags: [],
      difficulties: includeDifficultyData
        ? {
            BEGINNER: 0,
            EASY: 0,
            MEDIUM: 0,
            HARD: 0,
          }
        : undefined,
    };

    // Increment date based on step
    switch (step) {
      case 'month':
        currentDate.setMonth(currentDate.getMonth() + 1);
        break;
      case 'week':
        currentDate.setDate(currentDate.getDate() + 8);
        break;
      case 'day':
        currentDate.setDate(currentDate.getDate() + 1);
        break;
    }
  }

  // fill in actual data
  questions.forEach((answer) => {
    let key: string;
    const year = answer.createdAt.getFullYear();

    switch (step) {
      case 'month':
        key = `${answer.createdAt.toISOString().slice(0, 7)},${year}`;
        break;
      case 'week':
        const weekStart = new Date(answer.createdAt);
        weekStart.setDate(answer.createdAt.getDate() - answer.createdAt.getDay());
        key = `${weekStart.toISOString().slice(0, 10)},${year}`;
        break;
      case 'day':
        key = `${answer.createdAt.toISOString().slice(0, 10)},${year}`;
        break;
    }

    if (data[key]) {
      const tags = answer.question.tags.map((tag) => tag.tag.name);
      data[key].totalQuestions++;

      // Track difficulty if needed
      if (includeDifficultyData && data[key]?.difficulties && answer.question.difficulty) {
        const difficulty = answer.question.difficulty;
        const diffObj = data[key].difficulties;
        if (diffObj && typeof diffObj === 'object' && difficulty in diffObj) {
          diffObj[difficulty] = (diffObj[difficulty] || 0) + 1;
        }
      }

      tags.forEach((tag) => {
        data[key].tagCounts[tag] = (data[key].tagCounts[tag] || 0) + 1;
        if (!data[key].tags.includes(tag)) {
          data[key].tags.push(tag);
        }
      });
    }
  });

  if (separateByDifficulty) {
    // separate by difficulty
    const difficultyData: StatsChartData = {};
    Object.keys(data).forEach((key) => {
      const tags = data[key].tags;
      tags.forEach((tag) => {
        if (!difficultyData[tag]) {
          difficultyData[tag] = {
            totalQuestions: 0,
            tagCounts: {},
            tags: [],
          };
        }
        difficultyData[tag].totalQuestions += data[key].totalQuestions;
      });
    });
    return difficultyData;
  }

  revalidateTag('statistics');

  return data;
};

/**
 * Gets the total number of questions the user has answered within a specific range.
 */
const getTotalQuestionCount = async (userUid: string, to: string, from: StatsSteps | 'all') => {
  if (!userUid) {
    return null;
  }

  const toDate = new Date(to);
  const fromDate = from === 'all' ? new Date(0) : getRange(from);

  const questions = await prisma.answers.count({
    where: {
      userUid,
      createdAt: {
        gte: fromDate,
        lte: toDate,
      },
    },
  });

  revalidateTag('statistics');

  return questions;
};

/**
 * Gets the total time taken for questions answered within a specific range.
 */
export const getTotalTimeTaken = async (
  userUid: string,
  to?: string,
  from?: StatsSteps | 'all'
) => {
  if (!userUid) {
    return null;
  }

  // if no to or from, get all time taken
  if (!to && !from) {
    const answers = await prisma.answers.findMany({
      where: { userUid },
      select: { timeTaken: true },
    });
    return answers.reduce((acc, answer) => acc + (answer.timeTaken || 0), 0);
  }

  const toDate = new Date(to || new Date().toISOString());
  const fromDate = from === 'all' ? new Date(0) : getRange(from || '7d');

  const answers = await prisma.answers.findMany({
    where: {
      userUid,
      createdAt: {
        gte: fromDate,
        lte: toDate,
      },
    },
    select: {
      timeTaken: true,
    },
  });

  const totalTime = answers.reduce((acc, answer) => acc + (answer.timeTaken || 0), 0);

  revalidateTag('statistics');

  return totalTime;
};

/**
 * Gets the highest scoring tag within a specific range.
 */
const getHighestScoringTag = async (userUid: string, to: string, from: StatsSteps | 'all') => {
  if (!userUid) {
    return null;
  }

  const toDate = new Date(to);
  const fromDate = from === 'all' ? new Date(0) : getRange(from);

  const answers = await prisma.answers.findMany({
    where: {
      userUid,
      createdAt: {
        gte: fromDate,
        lte: toDate,
      },
    },
    include: {
      question: {
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
      },
    },
  });

  const tagCounts: Record<string, number> = {};

  answers.forEach((answer) => {
    answer.question.tags.forEach((tag) => {
      const tagName = tag.tag.name;
      tagCounts[tagName] = (tagCounts[tagName] || 0) + 1;
    });
  });

  const highestScoringTag = Object.keys(tagCounts).reduce(
    (a, b) => (tagCounts[a] > tagCounts[b] ? a : b),
    ''
  );

  revalidateTag('statistics');

  return {
    tag: highestScoringTag,
    count: tagCounts[highestScoringTag],
  };
};

export const getData = async (opts: {
  userUid: string;
  to: string;
  from: StatsSteps | 'all';
  step?: 'month' | 'week' | 'day';
  separateByDifficulty?: boolean;
  includeDifficultyData?: boolean;
}) => {
  const { userUid, to, from, step, separateByDifficulty, includeDifficultyData = false } = opts;

  // run all in parallel as they do not depend on each other
  const [stats, totalQuestions, totalTimeTaken, highestScoringTag] = await Promise.all([
    getStatsChartData({ ...opts, includeDifficultyData }),
    getTotalQuestionCount(userUid, to, from === 'all' ? '90d' : from), // Default to 90d for count if 'all' is used
    getTotalTimeTaken(userUid, to, from === 'all' ? '90d' : from), // Default to 90d for time if 'all' is used
    getHighestScoringTag(userUid, to, from === 'all' ? '90d' : from), // Default to 90d for tags if 'all' is used
  ]);

  return { stats, totalQuestions, totalTimeTaken, highestScoringTag };
};
