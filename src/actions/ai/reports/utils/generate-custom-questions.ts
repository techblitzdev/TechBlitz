'use server';
import { openai } from '@/lib/open-ai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { getPrompt } from '@/actions/ai/utils/get-prompt';
import { aiQuestionSchema } from '@/lib/zod/schemas/ai/response';
import type { UserRecord } from '@/types';

/**
 * Generate custom questions for a user based on their incorrect tags
 *
 * @param opts
 * @returns
 */
export const generateStatisticsCustomQuestions = async (opts: {
  incorrectTags: { tagName: string; count: number }[];
  user: UserRecord;
}) => {
  // the tags that we will pass to the prompt
  const { incorrectTags, user } = opts;

  const prompts = await getPrompt({
    name: ['statistics-generate-report'],
  });

  if (!prompts) {
    throw new Error('Prompt not found');
  }

  // generate the response that will create questions for the user
  // these questions are not accessible by other users (yet 😏)
  const firstPass = await openai.chat.completions.create({
    model: 'gpt-4o-mini-2024-07-18',
    messages: [
      {
        role: 'system',
        content: prompts['statistics-generate-report'].content,
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
        content: JSON.stringify(incorrectTags),
      },
    ],
    response_format: zodResponseFormat(aiQuestionSchema, 'event'),
    temperature: 0.7,
  });

  return firstPass.choices[0].message.content;
};
