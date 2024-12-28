'use server';
import { prisma } from '@/utils/prisma';
import { getUserFromSession } from '@/actions/user/authed/get-user';

/**
 * A method to analysis a users question responses and generate
 * a report back to the user.
 *
 * @returns
 */
export const generateStatisticsReport = async () => {
  // we need the user so we can get their responses
  const { data } = await getUserFromSession();
  if (!data || !data?.user?.id) {
    return null;
  }

  // go and get all the user responses.
  // we need to grab the tags attached to the answers
  return await prisma.answers.findMany({
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

  // we need to create two arrays of tags, one for how many the
  // user got answered correctly and one for how many they got
  // answered incorrectly.
};
