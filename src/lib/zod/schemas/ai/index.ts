import { z } from 'zod';

export const difficulty = z.enum(['easy', 'medium', 'hard']);

// create a schema for the answer for the question schema
export const answerSchema = z.object({
  answer: z.string(),
  correct: z.boolean()
});

export const questionSchema = z.object({
  questions: z.string(),
  codeSnippet: z.string(),
  hint: z.string(),
  difficulty,
  answers: z.array(answerSchema)
});

export const singleQuestionSchema = z.object({
  question: z.string(),
  codeSnippet: z.string(),
  hint: z.string(),
  difficulty,
  answers: z.array(answerSchema)
});
