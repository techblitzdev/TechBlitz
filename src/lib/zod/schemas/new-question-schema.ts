import { z } from 'zod';

// Define the schema for the question form
export const newQuestionSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    question: z.string().min(1, 'Question is required'),
    questionDate: z.string().optional(), // Make questionDate optional initially
    answers: z
      .array(
        z.object({
          text: z.string().min(1, 'Answer is required'),
          isCodeSnippet: z.boolean().default(false),
          answerFullSnippet: z.string().optional(),
        })
      )
      .nonempty('At least one answer is required'),
    correctAnswer: z.number().or(z.null()), // the index of the QuestionAnswer that is the correct answer
    codeSnippet: z.string().optional(),
    hint: z.string().optional(),
    dailyQuestion: z.boolean().default(false),
    tags: z.string().nonempty('At least one tag is required'),
    isRoadmapQuestion: z.boolean().default(false),
    aiTitle: z.string().optional(),
    // either easy, medium, or hard
    difficulty: z.enum(['BEGINNER', 'EASY', 'MEDIUM', 'HARD'], {
      required_error: 'Difficulty is required',
      invalid_type_error: 'Difficulty must be one of: easy, medium, or hard',
    }),
    questionResources: z
      .array(
        z.object({
          title: z.string().min(1, 'Title is required'),
          url: z.string().min(1, 'URL is required'),
        })
      )
      .optional(),
  })
  .refine((data) => !data.dailyQuestion || data.questionDate, {
    message: 'Date is required when Daily Question is enabled',
    path: ['questionDate'], // Error will be associated with questionDate
  });
