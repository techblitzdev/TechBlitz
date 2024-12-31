'use server';
import { openai } from '@/lib/open-ai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { aiQuestionSchema } from '@/lib/zod/schemas/ai/response';
import type { ReturnType } from '@/actions/ai/roadmap/get-question-data-for-gen';
import { getPrompt } from '@/actions/ai/utils/get-prompt';

export const generateRoadmapResponse = async (opts: {
  formattedData: ReturnType[];
}) => {
  const { formattedData } = opts;

  const prompts = await getPrompt({
    name: [
      'roadmap-generate-pass-one-teacher',
      'roadmap-generate-pass-one-question',
      'roadmap-generate-pass-one-topics',
      'roadmap-generate-pass-two',
    ],
  });

  if (!prompts) {
    throw new Error('Prompt not found');
  }

  const firstPass = await openai.chat.completions.create({
    model: 'gpt-4o-mini-2024-07-18',
    messages: [
      {
        role: 'system',
        content: prompts['roadmap-generate-pass-one-teacher'].content,
      },
      {
        role: 'system',
        content: prompts['roadmap-generate-pass-one-question'].content,
      },
      {
        role: 'system',
        content: prompts['roadmap-generate-pass-one-topics'].content,
      },
      {
        role: 'user',
        content: JSON.stringify(formattedData),
      },
    ],
    response_format: zodResponseFormat(aiQuestionSchema, 'event'),
    temperature: 0.7,
  });

  if (!firstPass.choices[0]?.message?.content) {
    throw new Error('AI response is missing content');
  }

  // second pass to ensure that the codesnippets do not contain the answer
  const secondPass = await openai.chat.completions.create({
    model: 'gpt-4o-mini-2024-07-18',
    messages: [
      {
        role: 'assistant',
        content: prompts['roadmap-generate-pass-two'].content,
      },
      {
        role: 'assistant',
        content: firstPass.choices[0].message.content,
      },
    ],
    response_format: zodResponseFormat(aiQuestionSchema, 'event'),
    temperature: 0,
  });

  console.log('Second pass:', secondPass.choices[0].message.content);

  return secondPass.choices[0].message.content;
};
