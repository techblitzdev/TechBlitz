'use server';
import { prisma } from '@/lib/prisma';
import { getPrompt } from '../utils/get-prompt';
import { getUser } from '@/actions/user/authed/get-user';
import { questionHelpSchema } from '@/lib/zod/schemas/ai/question-help';
import { zodResponseFormat } from 'openai/helpers/zod.mjs';
import { checkUserTokens, deductUserTokens } from '../utils/user-tokens';
import type { Question } from '@/types/Questions';
import type { DefaultRoadmapQuestions, RoadmapUserQuestions } from '@/types/Roadmap';

//
import { streamObject, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { stderr } from 'node:process';
import { createStreamableValue } from 'ai/rsc';

/**
 * Method to generate question help for both regular and roadmap questions.
 *
 * @param questionUid - The uid of the question to generate help for.
 * @param userContent - The user's content to generate help for.
 * @param isRoadmapQuestion - Whether this is a roadmap question or not
 * @returns
 */
export const generateQuestionHelp = async (
  questionUid: string,
  userContent?: string,
  questionType: 'roadmap' | 'regular' = 'regular'
) => {
  'use server';

  // get the current user requesting help
  const user = await getUser();
  if (!user) {
    return {
      content: null,
      tokensUsed: 0,
    };
  }

  // For regular questions, check if the user has enough tokens
  if (questionType === 'regular') {
    const hasTokens = await checkUserTokens(user);
    if (!hasTokens) {
      return {
        content: null,
        tokensUsed: 0,
      };
    }
  }

  // Initialize question variable
  let question: Question | RoadmapUserQuestions | DefaultRoadmapQuestions | null = null;

  // Get the appropriate question based on type
  if (questionType === 'roadmap') {
    // Get the roadmap question
    question = (await prisma.roadmapUserQuestions.findUnique({
      where: {
        uid: questionUid,
        AND: {
          roadmap: {
            userUid: user.uid,
          },
        },
      },
      include: {
        answers: true,
      },
    })) as RoadmapUserQuestions | null;
  } else if (questionType === 'regular') {
    // Get the regular question
    question = await prisma.questions.findUnique({
      where: {
        uid: questionUid,
      },
      include: {
        answers: true,
      },
    });
  }

  // if no question, return error
  if (!question) {
    return {
      content: null,
      tokensUsed: 0,
    };
  }

  // get the prompt
  const prompts = await getPrompt({
    name: ['ai-question-generation-help'],
  });

  // Start the stream generation in the background
  // This is important - we need to return the stream before it completes
  // Handle token decrement for regular questions
  if (questionType === 'regular') {
    const deducted = await deductUserTokens(user);
    if (!deducted) {
      return {
        content: null,
        tokensUsed: 0,
      };
    }
  }

  // create a streamable value
  const stream = createStreamableValue();

  (async () => {
    // generate the question help
    const { partialObjectStream } = streamObject({
      model: openai('gpt-4o-mini-2024-07-18'),
      temperature: 0.3,
      messages: [
        {
          role: 'system',
          content: prompts['ai-question-generation-help'].content,
        },
        {
          role: 'user',
          content: question.question,
        },
        {
          role: 'system',
          content: 'This is the reason as to why the user is asking for help: ',
        },
        {
          role: 'system',
          content:
            'The user has provided the following information about themselves, tailor your answer to this information:',
        },
        {
          role: 'user',
          content: user?.aboutMeAiHelp || '',
        },
        {
          role: 'user',
          content: userContent || '',
        },
      ],
      schema: questionHelpSchema,
    });

    for await (const partialObject of partialObjectStream) {
      stream.update(partialObject);
    }

    stream.done();
  })();

  return { object: stream.value };
};
