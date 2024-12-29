'use server';
import { prisma } from '@/utils/prisma';
import { UserRecord } from '@/types/User';

/**
 * Gathers the tag data for the user stats report
 *
 * @param opts user
 * @returns correctTags and incorrectTags
 */
export const getTagsReport = async (opts: {
  user: UserRecord;
}): Promise<{
  correctTags: { tagName: string; count: number }[];
  incorrectTags: { tagName: string; count: number }[];
}> => {
  const { user } = opts;

  if (!user) {
    return {
      correctTags: [],
      incorrectTags: [],
    };
  }

  // now we know the user is a premium user, we can go and get all the user responses.
  // we need to grab the tags attached to the answers
  const userAnswers = await prisma.answers.findMany({
    where: {
      userUid: user?.uid,
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

  // Create objects to store tag counts
  const correctTagCounts: { [key: string]: number } = {};
  const incorrectTagCounts: { [key: string]: number } = {};

  // Count occurrences of each tag
  userAnswers.forEach((answer) => {
    const tags = answer.question.tags.map((t) => t.tag.name);
    const targetCounts = answer.correctAnswer
      ? correctTagCounts
      : incorrectTagCounts;

    tags.forEach((tagName) => {
      targetCounts[tagName] = (targetCounts[tagName] || 0) + 1;
    });
  });

  // Convert to array of objects format
  const correctTagsArray = Object.entries(correctTagCounts).map(
    ([tagName, count]) => ({
      tagName,
      count,
    })
  );

  const incorrectTagsArray = Object.entries(incorrectTagCounts).map(
    ([tagName, count]) => ({
      tagName,
      count,
    })
  );

  return {
    correctTags: correctTagsArray,
    incorrectTags: incorrectTagsArray,
  };
};
