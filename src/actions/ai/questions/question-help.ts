'use server';
import { openai } from '@/lib/open-ai';
import { prisma } from '@/lib/prisma';
import { getPrompt } from '../utils/get-prompt';
import { getUser } from '@/actions/user/authed/get-user';
import { questionHelpSchema } from '@/lib/zod/schemas/ai/question-help';
import { zodResponseFormat } from 'openai/helpers/zod.mjs';
import type { Question } from '@/types/Questions';
import type { RoadmapUserQuestions } from '@/types/Roadmap';

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
  isRoadmapQuestion = false
) => {
  // get the current user requesting help
  const user = await getUser();

  if (!user) {
    return false;
  }

  // For regular questions, check if the user has enough tokens
  if (
    !isRoadmapQuestion &&
    user.aiQuestionHelpTokens &&
    user.aiQuestionHelpTokens <= 0
  ) {
    return false;
  }

  let question: Question | RoadmapUserQuestions | null;

  if (isRoadmapQuestion) {
    // Get the roadmap question
    question = await prisma.roadmapUserQuestions.findUnique({
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
    });
  } else {
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
    return false;
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

  // Handle token management based on question type and user level
  if (
    !isRoadmapQuestion &&
    user.userLevel !== 'PREMIUM' &&
    user.userLevel !== 'ADMIN'
  ) {
    // Deduct tokens for regular questions from non-premium users
    const updatedUser = await prisma.users.update({
      where: { uid: user.uid },
      data: { aiQuestionHelpTokens: { decrement: 1 } },
    });

    return {
      content: formattedData,
      tokens: updatedUser.aiQuestionHelpTokens,
    };
  }

  // For roadmap questions or premium users, return infinite tokens
  return {
    content: formattedData,
    tokens: Number.POSITIVE_INFINITY,
  };
};
