'use server';
import { openai } from '@/lib/open-ai';
import { prisma } from '@/lib/prisma';
import { getPrompt } from '../utils/get-prompt';
import { getUser } from '@/actions/user/authed/get-user';
import { questionHelpSchema } from '@/lib/zod/schemas/ai/question-help';
import { zodResponseFormat } from 'openai/helpers/zod.mjs';
import { checkUserTokens, deductUserTokens } from '../utils/user-tokens';
import type { Question } from '@/types/Questions';
import type { DefaultRoadmapQuestions, RoadmapUserQuestions } from '@/types/Roadmap';

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
  questionType: 'roadmap' | 'regular' | 'onboarding' = 'regular'
) => {
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
  } else if (questionType === 'onboarding') {
    // Get the onboarding question
    question = await prisma.defaultRoadmapQuestions.findUnique({
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

  // generate the question help
  const questionHelp = await openai.chat.completions.create({
    model: 'gpt-4o-mini-2024-07-18',
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
    response_format: zodResponseFormat(questionHelpSchema, 'event'),
  });

  if (!questionHelp.choices[0]?.message?.content) {
    throw new Error('AI response is missing content');
  }

  const formattedData = JSON.parse(questionHelp.choices[0].message.content);

  // Handle token decrement for regular questions
  if (questionType === 'regular') {
    const deducted = await deductUserTokens(user);
    if (!deducted) {
      return {
        content: null,
        tokensUsed: 0,
      };
    }

    return {
      content: formattedData,
      tokensUsed: user.aiQuestionHelpTokens ? user.aiQuestionHelpTokens - 1 : 0,
    };
  }

  // For roadmap questions or premium users, return infinite tokens
  return {
    content: formattedData,
    tokensUsed: Number.POSITIVE_INFINITY,
  };
};
