'use server';
import { openai } from '@/lib/open-ai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { getPrompt } from '@/actions/ai/utils/get-prompt';
import { aiQuestionSchema } from '@/lib/zod/schemas/ai/response';

export const generateStatisticsResponse = async (opts: {
  incorrectTags: { tagName: string; count: number }[];
}) => {
  // the tags that we will pass to the prompt
  const { incorrectTags } = opts;

  const prompts = await getPrompt({
    name: ['statistics-generate-report'],
  });

  if (!prompts) {
    throw new Error('Prompt not found');
  }

  // TODO: generate the response
  const firstPass = await openai.chat.completions.create({
    model: 'gpt-4o-mini-2024-07-18',
    messages: [
      {
        role: 'system',
        content: JSON.stringify(incorrectTags),
      },
      {
        role: 'system',
        content: prompts['statistics-generate-report'].content,
      },
    ],
    response_format: zodResponseFormat(aiQuestionSchema, 'event'),
    temperature: 0.7,
  });

  return firstPass.choices[0].message.content;
};
