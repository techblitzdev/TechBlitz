import * as React from 'react';
import { getUserFromDb } from '@/actions/user/authed/get-user';
import { NextRequest, NextResponse } from 'next/server';
import { mockUser } from '@/lib/mock';

export async function GET(
  req: NextRequest,
  {
    params
  }: {
    params: {
      uid: string;
    };
  }
) {
  const userId = params.uid;
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (!userId) {
    return NextResponse.json({
      error: 'No user id provided'
    });
  }

  if (isDevelopment) {
    return NextResponse.json({
      ...mockUser,
      uid: userId,
      userLevel: 'ADMIN'
    });
  }

  const user = await getUserFromDb(userId);

  if (!user || !user.uid) {
    return NextResponse.json({
      error: 'No user found'
    });
  }

  return NextResponse.json(user);
}
