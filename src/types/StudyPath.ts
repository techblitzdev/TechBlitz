import { StudyPath } from '@prisma/client';

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
