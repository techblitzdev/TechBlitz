'use server';

import { resend } from '@/lib/resend';
import { getUser } from '../user/authed/get-user';
import ReferralEmail from '@/components/templates/referral';
import { renderAsync } from '@react-email/components';
import React from 'react';
import { getUserMissionRecords } from '@/utils/data/missions/get-user-mission-record';
import { getDailyMissions } from '@/utils/data/missions/get-daily-missions';
import { prisma } from '@/lib/prisma';

export const sendInvite = async (email: string) => {
  const user = await getUser();

  if (!user) {
    throw new Error('User not found');
  }

  const html = await renderAsync(
    React.createElement(ReferralEmail, {
      referrerUid: user.uid,
      referrerEmail: user.email,
    })
  );

  const dailyMissions = await getDailyMissions();
  const userMissionRecords = await getUserMissionRecords();
  const referralMission = dailyMissions.find((mission) => mission.type === 'FRIEND_INVITED');

  const userMissionRecord = userMissionRecords.find(
    (record) => record.missionUid === referralMission?.uid
  );

  if (userMissionRecord?.status === 'COMPLETED') {
    return;
  }

  await prisma.userMission.update({
    where: { uid: userMissionRecord?.uid },
    data: { status: 'COMPLETED' },
  });

  await resend.emails.send({
    from: 'TechBlitz <team@techblitz.dev>',
    to: email,
    subject: 'Invite to TechBlitz from ' + user.email,
    html,
  });
};
