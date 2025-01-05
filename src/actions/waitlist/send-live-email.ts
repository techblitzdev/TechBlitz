'use server';
import React from 'react';
import { prisma } from '@/utils/prisma';
import { resend } from '@/lib/resend';
import WaitlistAnnouncementEmail from '@/components/templates/announcement';
import { renderAsync } from '@react-email/components';

export const sendLiveEmail = async () => {
  // get all of the waitlist user emails
  const waitlistUsers = await prisma.waitlist.findMany({
    select: {
      email: true,
    },
  });

  // loop through each user and send them an email
  for (const user of waitlistUsers) {
    const html = await renderAsync(
      React.createElement(WaitlistAnnouncementEmail, {
        email: user.email,
      })
    );

    // send the user the email
    await resend.emails.send({
      from: 'team@techblitz.dev',
      to: user.email,
      subject: 'TechBlitz is live!',
      html,
    });
  }
};
