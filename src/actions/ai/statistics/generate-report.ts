'use server';
import {
  getUserFromDb,
  getUserFromSession,
} from '@/actions/user/authed/get-user';
import { getTagsReport } from '@/actions/ai/statistics/utils/get-tags-report';

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

  const { correctTags, incorrectTags } = await getTagsReport({ user });

  console.log({
    correctTags,
    incorrectTags,
  });

  return {
    correctTags,
    incorrectTags,
  };
};
