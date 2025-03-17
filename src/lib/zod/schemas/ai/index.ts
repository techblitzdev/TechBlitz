import { z } from 'zod';

// create a schema for the answer for the question schema
const answerSchema = z.object({
  answer: z.string(),
  correct: z.boolean(),
});

export const questionSchema = z.object({
  questions: z.string(),
  codeSnippet: z.string(),
  hint: z.string(),
  difficulty: z.enum(['beginner', 'easy', 'medium', 'hard']),
  answers: z.array(answerSchema),
});

export const singleQuestionSchema = z.object({
  question: z.string().describe('The title of the question being asked to the user'),
  codeSnippet: z.string().describe('A code snippet that is relevant to the question.'),
  hint: z
    .string()
    .describe('A hint that is relevant to the question. Must not give away the answer.'),
  difficulty: z
    .enum(['beginner', 'easy', 'medium', 'hard'])
    .describe('The difficulty of the question'),
  answers: z.array(answerSchema),
});
