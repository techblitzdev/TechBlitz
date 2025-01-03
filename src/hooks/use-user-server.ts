import {
  getUserFromDb,
  getUserFromSession,
} from '@/actions/user/authed/get-user';
import { redirect } from 'next/navigation';

export const useUserServer = async () => {
  const userSession = await getUserFromSession();
  if (!userSession?.data?.user?.id) return redirect('/login');

  const userData = await getUserFromDb(userSession?.data?.user?.id);
  if (!userData) {
    console.error('No user data found');
    return null;
  }

  return userData;
};
