'use server';

import { getStudyPathByUid } from '@/utils/data/study-paths/get';
import { getUser } from '../user/authed/get-user';

import RoadmapCompleteEmail from '@/components/emails/roadmap-complete';
import { renderAsync } from '@react-email/components';
import React from 'react';

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
      user,
      studyPath,
    })
  );
};
