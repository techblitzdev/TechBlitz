'use server';
import { getUserFromSession } from '@/actions/user/authed/get-user';
import { openai } from '@/lib/open-ai';
import { questionSchema } from '@/lib/zod/schemas/ai';
import { prisma } from '@/utils/prisma';

/**
 * action to allow a user to change a question that has been
 * generated in their roadmap.
 *
 * @param
 * @returns
 */
export const generateNewRoadmapQuestion = async (opts: {
  questionUid: string;
}) => {
  const { questionUid } = opts;

  // get the current user
  // this is the user that is trying to change the question
  const user = await getUserFromSession();

  // check if the user is authenticated
  if (!user) {
    throw new Error('User not authenticated');
  }

  if (!questionUid) {
    throw new Error('Question uid is required');
  }

  // get the question from the database
  // this is the question that we will be mutating
  // check the user requesting is the same user that generated the roadmap
  // (this will change in the future when I add collaborative roadmaps)
  const question = await prisma.roadmapUserQuestions.findUnique({
    where: {
      uid: questionUid,
      AND: {
        roadmap: {
          userUid: user.data.user?.id
        }
      }
    }
  });

  if (!question) {
    throw new Error('Question not found');
  }

  // generate a new question
};
