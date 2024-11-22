'use server';
import { prisma } from '@/utils/prisma';
import { openai } from '@/lib/open-ai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { generateDataForAi } from './get-question-data-for-gen';
import {
  aiQuestionSchema,
  questionSchema,
} from '@/lib/zod/schemas/ai/response';
import { addUidsToResponse } from './utils/add-uids-to-response';

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
        content: `
            You are highly skilled in software development.
            You will be given a series of questions / answers that the user has already answered.
            You will need to generate a roadmap for the user to follow based on the answers that they have given.
            The roadmap should be at least 10 questions exactly.
            And should be designed to increase the users knowledge on the areas that the user got wrong.
            Also it needs to build upon the existing questions and provide next steps for the user.
            Each answer needs to have at max 4 possible answers, one needs to be correct.
          `,
      },
      {
        role: 'system',
        content: `The code snippet that you provide needs to be wrapped in a pre tag and a code tag`,
      },
      {
        role: 'user',
        content: JSON.stringify(formattedData),
      },
    ],
    response_format: zodResponseFormat(aiQuestionSchema, 'event'),
  });

  // turn the response into something we can loop over
  // and save to the database
  if (!res.choices[0]?.message?.content) {
    return 'invalid';
  }

  const formattedResponse = JSON.parse(res.choices[0].message.content);

  console.log({
    response: { ...formattedResponse.questionData },
  });

  const response = addUidsToResponse(formattedResponse.questionData);

  console.log({
    ...response,
  });

  // next we need to save the roadmap to the database
  // will use a transaction to make sure that everything is saved
  await prisma.$transaction([
    // prisma.userRoadmaps.update({
    //   where: {
    //     uid: opts.roadmapUid,
    //   },
    //   data: {
    //     hasGeneratedRoadmap: true,
    //   },
    // }),
    // prisma.roadmapUserQuestions.createMany({
    //   data: formattedResponse.questionData.map((question) => ({
    //     roadmapUid: opts.roadmapUid,
    //     questionUid: question.uid,
    //     question: question.questions,
    //     correctAnswerUid: question.correctAnswerUid,
    //   })),
    // }),
    // prisma.roadmapUserQuestionsAnswers.createMany({
    //   data: formattedResponse.questionData.map((question) => ({
    //     roadmapUid: opts.roadmapUid,
    //     questionUid: question.uid,
    //     answerUid: question.correctAnswerUid,
    //   })),
    // }),
  ]);

  return response;
};
