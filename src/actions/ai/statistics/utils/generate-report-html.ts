'use server';

import { getPrompt } from '@/actions/ai/utils/get-prompt';
import { openai } from '@/lib/open-ai';

type Tag = {
  tagName: string;
  count: number;
};

/**
 * Generate a report html for the user
 *
 * @param opts
 */
export const generateReportHtml = async (opts: {
  correctTags: Tag[];
  incorrectTags: Tag[];
}) => {
  const { correctTags, incorrectTags } = opts;

  // go and get the prompt from the db
  const prompts = await getPrompt({
    name: ['statistics-generate-report-html'],
  });

  if (!prompts) {
    throw new Error('Prompt not found');
  }

  const prompt = prompts['statistics-generate-report-html'].content;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini-2024-07-18',
    messages: [
      {
        role: 'system',
        content: prompt,
      },
      {
        role: 'user',
        content: JSON.stringify({ correctTags, incorrectTags }),
      },
    ],
  });

  return response.choices[0].message.content;
};
