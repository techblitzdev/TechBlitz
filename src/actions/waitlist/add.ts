'use server';
import { resend } from '@/lib/resend';
import { prisma } from '@/utils/prisma';
import WaitlistConfirmationEmail from '@/components/templates/waitlist';
import { renderAsync } from '@react-email/components';
import React from 'react';

export const addToWaitlist = async (email: string) => {
  if (!email || email.length === 0) {
    throw new Error('Email is required');
  }

  const user = await prisma.waitlist.create({
    data: {
      email
    }
  });

  if (!user) {
    throw new Error('Failed to add user to waitlist');
  }

  const html = await renderAsync(
    React.createElement(WaitlistConfirmationEmail, {
      email
    })
  );

  // send the user an email
  await resend.emails.send({
    from: 'welcome <team@techblitz.dev>',
    to: [email],
    subject: 'Waitlist Confirmation',
    html
  });
};
