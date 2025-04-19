import { StudyPath } from '@prisma/client';
import { Question } from './Questions';

export interface StudyPathOverviewData {
  [key: string]: {
    icon?: string;
    sectionName: string;
    color?: string;
    subSections?: {
      [key: string]: {
        sectionName: string;
        sectionSlug: string;
        questionSlugs: string[];
      };
    };
    questionSlugs?: string[];
  };
}

export interface StudyPathWithOverviewData extends StudyPath {
  overviewData: StudyPathOverviewData;
}

/**
 * Represents a 'sub section' of a study path.
 */
export interface StudyPathSubSections {
  key: string;
  sectionName: string;
  questionSlugs: string[];
  questions: Question[];
  completionPercentage: number;
  isIncomplete: boolean;
  isFirstIncompleteSubSection: boolean;
  nextQuestionIndex?: number;
  sectionSlug?: string;
}
