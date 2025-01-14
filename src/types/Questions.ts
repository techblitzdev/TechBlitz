import { QuestionResources, StatisticsReport } from '@prisma/client';
import { QuestionAnswer } from './QuestionAnswers';
import { Tags } from './Tags';

export type QuestionDifficulty = 'BEGINNER' | 'EASY' | 'MEDIUM' | 'HARD';

/**
 * This type represents the shape of the data of a question.
 */
export type Question = {
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
};

export type QuestionWithoutAnswers = Omit<Question, 'answers'>;

export type QuestionWithTags = QuestionWithoutAnswers & {
  tags: Array<{
    tag: {
      uid: string;
      name: string;
    };
  }>;
};
