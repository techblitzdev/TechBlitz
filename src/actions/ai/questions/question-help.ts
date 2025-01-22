'use server';
import { openai } from '@/lib/open-ai';
import { prisma } from '@/lib/prisma';
import { getPrompt } from '../utils/get-prompt';
import { getUser } from '@/actions/user/authed/get-user';
import { questionHelpSchema } from '@/lib/zod/schemas/ai/question-help';
import { zodResponseFormat } from 'openai/helpers/zod.mjs';

/**
 * Method to generate question help for a question.
 *
 * @param questionUid - The uid of the question to generate help for.
 * @param userContent - The user's content to generate help for.
 * @returns
 */
export const generateQuestionHelp = async (
  questionUid: string,
  userContent?: string
) => {
  // get the current user requesting help
  const user = await getUser();

  // if no user, return false
  if (!user) {
    return false;
  }

  // now check if the user has enough tokens
  if (user.aiQuestionHelpTokens && user.aiQuestionHelpTokens <= 0) {
    return false;
  }

  // get the question
  const question = await prisma.questions.findUnique({
    where: {
      uid: questionUid,
    },
  });

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

  // if the user is a premium users, do not deduct tokens
  if (user.userLevel === 'PREMIUM') {
    return {
      content: formattedData,
      tokens: Infinity,
    };
  }

  // deduct the tokens from free users
  const updatedUser = await prisma.users.update({
    where: { uid: user.uid },
    data: { aiQuestionHelpTokens: { decrement: 1 } },
  });

  return {
    content: formattedData,
    tokens: updatedUser.aiQuestionHelpTokens,
  };
};
