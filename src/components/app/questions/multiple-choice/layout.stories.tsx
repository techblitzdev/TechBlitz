import type { Meta, StoryObj } from '@storybook/react';
import { Questions, QuestionDifficulty, QuestionType } from '@prisma/client';
import Layout from './layout';

const meta = {
  component: Layout,
} satisfies Meta<typeof Layout>;

export default meta;

type Story = StoryObj<typeof meta>;

// Mock the answers as strings
const mockAnswers = ['OK', 'Created', 'Bad Request', 'Not Found'];

// Create a mock question that follows the Questions interface from Prisma
const mockQuestion = {
  uid: '123',
  question: 'What does the 200 HTTP status code mean?',
  createdAt: new Date(),
  updatedAt: new Date(),
  questionDate: new Date().toISOString(),
  answerResource: null,
  correctAnswer: 'OK',
  codeSnippet: null,
  hint: null,
  dailyQuestion: false,
  difficulty: QuestionDifficulty.EASY,
  customQuestion: false,
  slug: 'http-200-status',
  slugGenerated: true,
  description: null,
  title: 'HTTP Status Codes',
  questionType: QuestionType.MULTIPLE_CHOICE,
  expectedParams: null,
  functionName: null,
  returnType: null,
  testCases: null,
  nextQuestionSlug: null,
  previousQuestionSlug: null,
  isPremiumQuestion: false,
  afterQuestionInfo: null,
  // Add the answers property (will be mocked at runtime)
  answers: mockAnswers,
} as unknown as Questions;

export const Default: Story = {
  args: {
    Question: mockQuestion,
  },
};
