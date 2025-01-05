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

  // render the email
  const html = await renderAsync(
    React.createElement(WaitlistAnnouncementEmail, {
      email: 'team@techblitz.dev',
    })
  );

  // TESTING
  await resend.emails.send({
    from: 'team@techblitz.dev',
    to: 'logan@hiyield.co.uk',
    subject: 'TechBlitz is live!',
    html,
  });
};
