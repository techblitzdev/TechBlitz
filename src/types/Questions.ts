import { QuestionResources, StatisticsReport } from '@prisma/client';
import { QuestionAnswer } from './QuestionAnswers';
import { Tags } from './Tags';

export type QuestionDifficulty = 'BEGINNER' | 'EASY' | 'MEDIUM' | 'HARD';

export type QuestionType = 'MULTIPLE_CHOICE' | 'CODING_CHALLENGE';

/**
 * This type represents the shape of the data of a question.
 */
export type Question = {
  title: string | null;
  description: string | null;
  answers: QuestionAnswer[];
  uid: string;
  question: string;
  createdAt: Date;
  updatedAt: Date;
  questionDate: string | null;
  answerResource: string | null;
  correctAnswer: string | null;

  codeSnippet: string | null;

  hint: string | null;

  dailyQuestion: boolean;

  customQuestion: boolean;

  tags?: Tags[];

  difficulty: QuestionDifficulty;

  linkedReports?: StatisticsReport[];

  QuestionResources?: QuestionResources[];

  slug: string | null;

  slugGenerated: boolean;

  questionType: QuestionType;

  testCases: {
    input: number[];
    expected: number;
  }[];

  functionName: string;

  expectedParams: string[];
};

export type QuestionWithoutAnswers = Omit<
  Question,
  'answers' | 'testCases' | 'functionName' | 'expectedParams'
>;

export type QuestionWithTags = QuestionWithoutAnswers & {
  tags: Array<{
    tag: {
      uid: string;
      name: string;
    };
  }>;
};
