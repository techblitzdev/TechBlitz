import { prisma } from '@/lib/prisma';
import { UserRecord } from '@/types/User';

/**
 * We now have a new pricing plan for users.
 * (Lifetime) which gives user 500 tokens
 * (premium monthly) which gives user unlimited tokens
 *
 * This function checks the users tokens and returns the amount of tokens they have left.
 *
 * @param user
 */
export const checkUserTokens = async (user: UserRecord) => {
  if (user.userLevel === 'ADMIN') {
    return true;
  }

  // free users cannot use ai
  if (user.userLevel === 'FREE') {
    return false;
  }

  if (user.userLevel === 'LIFETIME') {
    return true;
  }

  if (user.userLevel === 'PREMIUM') {
    return true;
  }

  return false;
};

export const deductUserTokens = async (user: UserRecord) => {
  // user cannot continue if they have no tokens
  if (user.aiQuestionHelpTokens === 0) {
    return false;
  }

  // admins do not get tokens deducted
  if (user.userLevel === 'ADMIN' || user.userLevel === 'PREMIUM') {
    return true;
  }

  // if lifetime, deduct the tokens used
  if (user.userLevel === 'LIFETIME') {
    // check if the user has enough tokens
    if (user.aiQuestionHelpTokens && user.aiQuestionHelpTokens < 1) {
      return false;
    }

    // deduct the tokens used
    await prisma.users.update({
      where: { uid: user.uid },
      data: { aiQuestionHelpTokens: { decrement: 1 } },
    });
  }

  return true;
};
