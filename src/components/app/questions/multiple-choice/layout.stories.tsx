import type { Meta, StoryObj } from '@storybook/react';
import { QuestionDifficulty, QuestionType } from '@prisma/client';
import Layout from './layout';
import { QuestionAnswer } from '@/types/QuestionAnswers';

const meta = {
  component: Layout,
} satisfies Meta<typeof Layout>;

export default meta;

type Story = StoryObj<typeof meta>;

// Mock the answers as QuestionAnswer objects
const mockAnswers: QuestionAnswer[] = [
  {
    uid: 'answer-1',
    questionUid: '123',
    answer: 'OK',
    answerType: 'STANDARD',
    isCodeSnippet: false,
  },
  {
    uid: 'answer-2',
    questionUid: '123',
    answer: 'Created',
    answerType: 'STANDARD',
    isCodeSnippet: false,
  },
  {
    uid: 'answer-3',
    questionUid: '123',
    answer: 'Bad Request',
    answerType: 'STANDARD',
    isCodeSnippet: false,
  },
  {
    uid: 'answer-4',
    questionUid: '123',
    answer: 'Not Found',
    answerType: 'STANDARD',
    isCodeSnippet: false,
  },
];

// Create a mock question
const mockQuestion = {
  uid: '123',
  question: 'What does the 200 HTTP status code mean?',
  createdAt: new Date(),
  updatedAt: new Date(),
  questionDate: new Date().toISOString(),
  answerResource: null,
  correctAnswer: 'answer-1', // Now using the UID of the correct answer
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
  answers: QuestionAnswer[];
  [key: string]: any;
}

export const Default: Story = {
  args: {
    question: mockQuestion as QuestionMock,
    nextAndPreviousQuestion: null,
  },
};
