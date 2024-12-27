'use server';
import { prisma } from '@/utils/prisma';
import { openai } from '@/lib/open-ai';
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

  // go and get the user responses.
  // we need to grab the tags attached to the answers
  const userResponses = await prisma.answers.findMany({
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

  // we need to get the tags from the responses
  const tags = userResponses.map((response) => response.question.tags);
};
