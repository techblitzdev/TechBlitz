'use server';

import { resend } from '@/lib/resend';
import { getUser } from '../user/authed/get-user';
import ReferralEmail from '@/components/templates/referral';
import { renderAsync } from '@react-email/components';
import React from 'react';

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

  await resend.emails.send({
    from: 'team@techblitz.dev',
    to: email,
    subject: 'Invite to TechBlitz from ' + user.email,
    html,
  });
};
