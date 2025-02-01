import { BaseRecord } from "./BaseRecord";
import { UserWithOutAnswers } from "./User";

type AnswerDifficulty = "EASY" | "MEDIUM" | "HARD";

/**
 * The Answer type is the shape of the data when a user
 * answers a question.
 */
export interface Answer extends BaseRecord {
  /** The id of the user that has answers the question */
  userUid: string;
  /** The uid of the question this answer is for */
  questionUid: string;
  /** The uid of the questionAnswer (the answer the user selected) */
  // optional due to code editor answers
  userAnswerUid: string | null;
  /** If the question was correct or incorrect */
  correctAnswer: boolean;
  /** The date when the user answered this question */
  questionDate: string;
  /** How long it took the user to answer this question */
  timeTaken: number | null;

  /** The difficulty the user found this question */
  difficulty: AnswerDifficulty;
}

export interface AnswerWithUser extends Answer {
  user: UserWithOutAnswers;
}
