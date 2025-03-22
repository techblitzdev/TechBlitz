import type { Meta, StoryObj } from '@storybook/react';
import { QuestionDifficulty, QuestionType } from '@prisma/client';
import Layout from './layout';
import { Question } from '@/types/Questions';

const meta = {
  component: Layout,
} satisfies Meta<typeof Layout>;

export default meta;

type Story = StoryObj<typeof meta>;

// Mock the answers as strings
const mockAnswers = ['OK', 'Created', 'Bad Request', 'Not Found'];

// Create a mock question
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
  answers: mockAnswers,
};

// Type definition for our mock question
interface QuestionMock {
  uid: string;
  question: string;
  questionDate: string;
  correctAnswer: string;
  answers: string[];
  [key: string]: any;
}

export const Default: Story = {
  args: {
    question: mockQuestion as QuestionMock,
  },
};
