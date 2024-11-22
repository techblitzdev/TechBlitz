'use server';
import { prisma } from '@/utils/prisma';
import { openai } from '@/lib/open-ai';
import { generateDataForAi } from './get-question-data-for-gen';

export const roadmapGenerate = async (opts: {
  roadmapUid: string;
  userUid: string;
}) => {
  // get the data that we need in the right format
  const formattedData = await generateDataForAi(opts);

  if (
    !formattedData ||
    formattedData === 'generated' ||
    formattedData === 'invalid'
  ) {
    return 'invalid';
  }

  // now we need to send the data to the AI
  const res = await openai.chat.completions.create({
    model: 'gpt-4o-mini-2024-07-18',
    messages: [
      {
        role: 'system',
        content:
          'You are highly skilled in software development. You are going to be helping create a roadmap for a user to learn software development. You will be given a series of questions / answers that the user has already answered. You will need to generate a roadmap for the user to follow based on the answers that they have given. The roadmap should be at least 30 questions. And should be designed to increase the users knowledge on the areas that the user got wrong. Also it needs to build upon the existing questions and provide next steps for the user. ',
      },
      {
        role: 'user',
        content: JSON.stringify(formattedData),
      },
    ],
  });

  return res.choices[0].message;
};
