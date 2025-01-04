'use server';
import { openai } from '@/lib/open-ai';
import Anthropic from '@anthropic-ai/sdk';
import { getPrompt } from './utils/get-prompt';

export const test = async () => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini-2024-07-18',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      {
        role: 'user',
        content: 'Write a haiku about recursion in programming.',
      },
    ],
  });

  console.log(completion.choices[0].message);
  return completion.choices[0].message;
};

const apiKey = process.env.NEXT_PRIVATE_CLAUDE_API_KEY;

const anthropic = new Anthropic({ apiKey });

export const claudeTest = async () => {
  const prompt = await getPrompt({
    name: ['claude-ai-test'],
  });

  if (!prompt) {
    throw new Error('Prompt not found');
  }

  const msg = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1000,
    temperature: 0,
    messages: [{ role: 'user', content: prompt['claude-ai-test'].content }],
  });

  console.log(msg);
};
