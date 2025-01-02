import * as React from 'react';
import {
  getUserFromDb,
  getUserFromSession,
} from '@/actions/user/authed/get-user';
import { redirect } from 'next/navigation';
import { mockUser } from '@/lib/mock';

export const useUserServer = async () => {
  if (process.env.NODE_ENV === 'development') {
    return {
      ...mockUser,
      uid: 'mock-user-id',
      userLevel: 'ADMIN'
    };
  }

  const userSession = await getUserFromSession();
  if (!userSession?.data?.user?.id) return redirect('/login');

  const userData = await getUserFromDb(userSession?.data?.user?.id);
  if (!userData) {
    console.error('No user data found');
    return null;
  }

  return userData;
};
