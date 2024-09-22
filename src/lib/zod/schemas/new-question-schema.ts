import { z } from 'zod';

// Define the schema for the question form
export const newQuestionSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  questionDate: z.string().min(1, 'Date is required'),
  // Define answers as an array of strings
  answers: z
    .array(
      z.object({
        text: z.string().min(1, 'Answer is required'), // Each answer must be a string
      })
    )
    .nonempty('At least one answer is required'),
  correctAnswer: z.number().or(z.null()), // the index of the QuestionAnswer that is the correct answer
});
