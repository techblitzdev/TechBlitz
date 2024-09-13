import { z } from 'zod';

export const newQuestionSchema = z.object({
  question: z.string().min(6),
  answer: z.string(),
  questionDate: z.string().min(6),
});