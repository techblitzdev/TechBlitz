'use server';
import { prisma } from '@/utils/prisma';
import {
  getUserFromDb,
  getUserFromSession,
} from '@/actions/user/authed/get-user';

/**
 * A method to analysis a users question responses and generate
 * a report back to the user.
 *
 * @returns An object containing arrays of tag counts for correct and incorrect answers
 */
export const generateStatisticsReport = async () => {
  // we need the user so we can get their responses
  const { data } = await getUserFromSession();
  if (!data || !data?.user?.id) {
    return null;
  }

  // now check that the user is a premium user via their userLevel
  const user = await getUserFromDb(data?.user?.id);
  if (!user) {
    return null;
  }

  // now check that the user is a premium user via their userLevel
  if (user.userLevel !== 'PREMIUM' && user.userLevel !== 'ADMIN') {
    throw new Error('User is not a premium user');
  }

  // now we know the user is a premium user, we can go and get all the user responses.
  // we need to grab the tags attached to the answers
  const userAnswers = await prisma.answers.findMany({
    where: {
      userUid: data?.user?.id,
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

  console.log({
    correctTags: correctTagsArray,
    incorrectTags: incorrectTagsArray,
  });

  return {
    correctTags: correctTagsArray,
    incorrectTags: incorrectTagsArray,
  };
};
