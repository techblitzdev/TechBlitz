import { getUserFromDb, getUserFromSession } from '@/actions/user/authed/get-user';
import { cache } from 'react';

export const useUserServer = cache(async () => {
  const userSession = await getUserFromSession();
  if (!userSession?.data?.user?.id) return null;

  const userData = await getUserFromDb(userSession?.data?.user?.id);
  if (!userData) {
    console.error('No user data found');
    return null;
  }

  return userData;
});
