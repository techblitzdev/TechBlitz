/**
 * The Answer type is the shape of the data when a user
 * answers a question.
 */
export type Answer = {
  uid: string;
  user: string;
  question: string;

  userAnswer: string;
  correctAnswer: string;

  createdAt: string;
  updatedAt: string;

  questionDate: string;

  timeTaken?: number;
};
