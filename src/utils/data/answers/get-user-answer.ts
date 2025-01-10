import { getUser } from '@/actions/user/authed/get-user';
import { prisma } from '@/lib/prisma';

/**
 * Get's the answer for a given question uid
 * and user uid
 *
 * @param opts
 * @returns
 */
export const getUserAnswer = async (opts: { questionUid: string }) => {
  const { questionUid } = opts;

  const user = await getUser();

  if (!user) {
    return false;
  }

  // find the answer to the question
  return await prisma.answers.findFirst({
    where: {
      questionUid,
      userUid: user?.uid,
    },
  });
};
