import { QuestionAnswer } from './QuestionAnswers';

export type Question = {
  answers: QuestionAnswer[];
  uid: string;
  question: string;
  createdAt: Date;
  updatedAt: Date;
  questionDate: Date;
  answerResource: string | null;
  correctAnswer: string | null;
};
