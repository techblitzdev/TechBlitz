import { getUserFromDb } from '@/actions/user/get-user';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, {
  params
}: {
  params: {
    uid: string;
  }
}) {
  // get the userId from the params
  const userId = params.uid;  
  
  if (!userId) {
    return NextResponse.json({
      error: 'No user id provided'
    })
  }

  // now go get the user from the db
  const user = await getUserFromDb(userId);

  if (!user || !user.uid) {
    return NextResponse.json({
      error: 'No user found'
    })
  }

  return NextResponse.json(user);
}