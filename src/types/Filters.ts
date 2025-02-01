import type { QuestionDifficulty } from "./Questions";

export interface QuestionFilters {
  tags?: string[];
  difficulty?: QuestionDifficulty;
  answered?: boolean;
  ascending?: boolean;
  page?: number;
  questionType?: string;
  sortBy?: "date" | "submissions";
  postsPerPage?: number;
  bookmarked?: boolean;
  isPremiumQuestion?: boolean;
  recommended?: boolean;
}
