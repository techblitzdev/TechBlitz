'use server';

import { openai } from '@/lib/open-ai';
import { prisma } from '@/lib/prisma';
import { getPrompt } from '../utils/get-prompt';
import { getUser } from '@/actions/user/authed/get-user';

import { answerHelpSchema } from '@/lib/zod/schemas/ai/answer-help';
import { zodResponseFormat } from 'openai/helpers/zod.mjs';

/**
 * Method to generate answer help for a question.
 * It will return the code snippet, but fully explained with comments and explanations.
 *
 * @param questionUid - The uid of the question to generate help for.
 * @param userCorrect - Whether the user answered correctly - helps us to generate a better explanation
 * @returns
 */
export const generateAnswerHelp = async (
  questionUid: string,
  userCorrect: boolean
) => {
  const user = await getUser();

  // we need the user in order to check if they have enough tokens
  if (!user) {
    return false;
  }

  // check if the user has enough tokens, if not return false
  if (user.aiQuestionHelpTokens && user.aiQuestionHelpTokens <= 0) {
    return false;
  }

  // get the question
  const question = await prisma.questions.findUnique({
    where: { uid: questionUid },
  });

  // if no question, return error
  if (!question) {
    return false;
  }

  // get the answer help prompt
  const answerHelpPrompt = await getPrompt({
    name: 'question-answer-help',
  });

  // generate the answer help
  const answerHelp = await openai.chat.completions.create({
    model: 'gpt-4o-mini-2024-07-18',
    temperature: 0,
    messages: [
      {
        role: 'system',
        content: answerHelpPrompt['question-answer-help'].content,
      },
      {
        role: 'system',
        content:
          'The user answered correctly: ' +
          (userCorrect ? 'true' : 'false') +
          '. This is the reason as to why the user is asking for help: ' +
          (userCorrect
            ? 'The user answered correctly'
            : 'The user answered incorrectly, provide a more detailed explanation'),
      },
      {
        role: 'user',
        content: question.codeSnippet || '',
      },
    ],
    response_format: zodResponseFormat(answerHelpSchema, 'event'),
  });

  if (!answerHelp.choices[0]?.message?.content) {
    throw new Error('AI response is missing content');
  }

  const formattedData = JSON.parse(answerHelp.choices[0].message.content);

  // now decrement the user's aiQuestionHelpTokens if they are on the free plan
  // (premium gets unlimited)
  if (user.userLevel === 'PREMIUM') {
    return {
      ...formattedData,
      tokensUsed: Infinity,
    };
  }

  const updatedUser = await prisma.users.update({
    where: { uid: user.uid },
    data: { aiQuestionHelpTokens: { decrement: 1 } },
  });

  return {
    content: formattedData,
    tokensUsed: updatedUser.aiQuestionHelpTokens,
  };
};
