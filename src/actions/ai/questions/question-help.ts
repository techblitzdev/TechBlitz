'use server';
import { openai } from '@/lib/open-ai';
import { prisma } from '@/lib/prisma';
import { getPrompt } from '../utils/get-prompt';
import { getUser } from '@/actions/user/authed/get-user';

export const generateQuestionHelp = async (
  questionUid: string,
  userContent?: string
) => {
  // get the current user requesting help
  const user = await getUser();

  // if no user, return error
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
        role: 'user',
        content: userContent || '',
      },
    ],
  });

  // if the user is a premium users, do not deduct tokens
  if (user.userLevel === 'PREMIUM') {
    return {
      content: questionHelp.choices[0].message.content,
      tokens: Infinity,
    };
  }

  // deduct the tokens from free users
  const updatedUser = await prisma.users.update({
    where: { uid: user.uid },
    data: { aiQuestionHelpTokens: { decrement: 1 } },
  });

  return {
    content: questionHelp.choices[0].message.content,
    tokens: updatedUser.aiQuestionHelpTokens,
  };
};
