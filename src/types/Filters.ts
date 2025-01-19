import type { QuestionDifficulty } from './Questions';

export interface QuestionFilters {
  tags?: string[];
  difficulty?: QuestionDifficulty;
  completed?: boolean;
  ascending?: boolean;
  page?: number;
  questionType?: string;
}
