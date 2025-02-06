'use server';
import { getUser } from '@/actions/user/authed/get-user';
import { prisma } from '@/lib/prisma';
import { uniqueId } from 'lodash';

export const createUserMissionRecord = async () => {
  // ensure the person running this script is an admin
  const user = await getUser();
  if (!user || user.userLevel !== 'ADMIN') {
    throw new Error('You are not authorized to run this script');
  }

  // go get all the existing users
  const users = await prisma.users.findMany();

  // create a mission record for each user
  for (const user of users) {
    const missionUid = uniqueId('user-mission-');

    // create the mission record
    await prisma.userMission.create({
      data: {
        userUid: user.uid,
        missionUid,
      },
    });
  }
};
