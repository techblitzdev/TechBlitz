'use server';

import { createUserMissionRecords } from '@/actions/daily-missions/create-user-missions-record';
import { prisma } from '@/lib/prisma';

export async function addUserMissions() {
  const users = await prisma.users.findMany();

  for (const user of users) {
    await createUserMissionRecords({ uid: user.uid });
  }
}
