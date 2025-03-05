'use server';

import { getStudyPathByUid } from '@/utils/data/study-paths/get';
import { getUser } from '../user/authed/get-user';

import RoadmapCompleteEmail from '@/components/emails/roadmap-complete';
import { renderAsync } from '@react-email/components';
import React from 'react';
import { resend } from '@/lib/resend';

export const sendStudyPathCompleteEmail = async ({ studyPathUid }: { studyPathUid: string }) => {
  const user = await getUser();

  if (!user) {
    throw new Error('User not found');
  }

  const studyPath = await getStudyPathByUid(studyPathUid);

  if (!studyPath) {
    throw new Error('Study path not found');
  }

  const html = await renderAsync(
    React.createElement(RoadmapCompleteEmail, {
      headingText: 'Congratulations on completing your study path!',
      username: user.username || 'User',
      studyPathTitle: studyPath.title,
      completionDate: new Date().toLocaleDateString(),
    })
  );

  // TODO: Add email sending logic here
  await resend.emails.send({
    from: 'TechBlitz <techblitz@techblitz.io>',
    to: user.email,
    subject: '🥳 Congratulations on completing your study path!',
    react: html,
  });

  return { success: true };
};
