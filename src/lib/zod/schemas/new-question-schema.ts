import { z } from 'zod';

// Define the schema for the question form
export const newQuestionSchema = z
  .object({
    question: z.string().min(1, 'Question is required'),
    questionDate: z.string().optional(), // Make questionDate optional initially
    answers: z
      .array(
        z.object({
          text: z.string().min(1, 'Answer is required'),
        })
      )
      .nonempty('At least one answer is required'),
    correctAnswer: z.number().or(z.null()), // the index of the QuestionAnswer that is the correct answer
    codeSnippet: z.string().optional(),
    hint: z.string().optional(),
    dailyQuestion: z.boolean().default(false),
  })
  .refine((data) => !data.dailyQuestion || data.questionDate, {
    message: 'Date is required when Daily Question is enabled',
    path: ['questionDate'], // Error will be associated with questionDate
  });
