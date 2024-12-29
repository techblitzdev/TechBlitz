'use server';

import { getPrompt } from '@/actions/ai/utils/get-prompt';

export const generateReportHtml = async (opts: {
  correctTags: string[];
  incorrectTags: string[];
}) => {
  const { correctTags, incorrectTags } = opts;

  // go and get the prompt from the db
  const prompts = await getPrompt({
    name: ['statistics-generate-report-html'],
  });

  if (!prompts) {
    throw new Error('Prompt not found');
  }
};
