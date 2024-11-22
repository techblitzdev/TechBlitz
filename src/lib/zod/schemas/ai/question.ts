import { z } from 'zod';

const difficulty = z.enum(['easy', 'medium', 'hard']);

export const questionSchema = z.object({
  questions: z.string(),
  codeSnippet: z.string(),
  hint: z.string(),
  difficulty,
});

export const aiQuestionSchema = z.object({
  questionData: z.array(questionSchema),
});
