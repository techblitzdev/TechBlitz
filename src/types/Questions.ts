import { QuestionResources, StatisticsReport, UserBookmarks } from '@prisma/client';
import { QuestionAnswer } from './QuestionAnswers';
import { Tags } from './Tags';
import { Answer } from './Answers';

export type QuestionDifficulty = 'BEGINNER' | 'EASY' | 'MEDIUM' | 'HARD';

export type QuestionType = 'MULTIPLE_CHOICE' | 'CODING_CHALLENGE' | 'SIMPLE_MULTIPLE_CHOICE';

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

  nextQuestionSlug: string | null;

  previousQuestionSlug: string | null;

  // i am so sorry typescript lords (Json from prisma isn't nice to work with)
  testCases: any;

  functionName: string | null;

  // i am so sorry typescript lords
  expectedParams: any;

  bookmarks?: UserBookmarks[];

  isPremiumQuestion: boolean;

  userAnswers?: Answer[];
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
