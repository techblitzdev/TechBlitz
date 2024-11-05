import { QuestionAnswer } from './QuestionAnswers';

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
};
