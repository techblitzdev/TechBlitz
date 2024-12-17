'use server';
import { openai } from '@/lib/open-ai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { aiQuestionSchema } from '@/lib/zod/schemas/ai/response';
import type { ReturnType } from '../roadmap/get-question-data-for-gen';

export const generateRoadmapResponse = async (opts: {
  formattedData: ReturnType[];
}) => {
  const { formattedData } = opts;

  const firstPass = await openai.chat.completions.create({
    model: 'gpt-4o-mini-2024-07-18',
    messages: [
      {
        role: 'system',
        content: `You're an expert software developer teacher. Given a series of user-answered questions with results, generate a roadmap to enhance the user's knowledge. Focus on areas the user got wrong, AND build on prior questions, guide their next steps. Each question MUST have 4 answers, 1 correct. There MUST be MAXIMUM 10 questions. The title of the roadmap MUST be relevant to the questions. The description MUST be relevant to the questions. MAKE title and description concise.`
      },
      {
        role: 'system',
        content: `The code snippet MUST to be wrapped in a pre tag and a code tag and be put in the 'codeSnippet' field. The title MUST NOT contain code that relates to the code snippet. Title MUST be a question. Answers MUST relate to question title. CodeSnippet MUST relate to question title. Answers MUST be related to the code snippet. Difficulty MUST be related to the code snippet. Questions MUST be unique. The answers MUST be unique. Question MUST be unique. QUESTION QUESTIONS MUST NOT BE REPEATED.`
      },
      {
        role: 'system',
        content:
          'Topics to focus on: JavaScript, Promises, Async/Await, Array Methods, Objects, scope, closures, fetch, callbacks, recursion, & other topics you think are relevant. Make sure to include a variety of question types. MAKE the questions be real-world applicable.'
      },
      {
        role: 'user',
        content: JSON.stringify(formattedData)
      }
    ],
    response_format: zodResponseFormat(aiQuestionSchema, 'event'),
    temperature: 0
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
        content:
          'Please ensure that the code snippets do not contain the answer. If they do, please remove the answer from the code snippet. Do not modify the question, answers, hints or codeSnippet fields if not required. Ensure no question question are repeated. If they are, remove them.'
      },
      {
        role: 'assistant',
        content: firstPass.choices[0].message.content
      }
    ],
    response_format: zodResponseFormat(aiQuestionSchema, 'event'),
    temperature: 0
  });

  return secondPass.choices[0].message.content;
};
