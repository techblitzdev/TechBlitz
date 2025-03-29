import { StudyPath as PrismaStudyPath } from '@prisma/client';

/**
 * A type to structure the questions available for a roadmap.
 *
 * Each roadmap is separated into different sections.
 * Each section (on the roadmap/[roadmap-slug]) will give a
 * brief description of the topics covered in that section.
 *
 * The questions are then grouped under their respective section key,
 * which can be used to fetch the questions for a specific section.
 *
 * the current type is just a string[]
 */
export interface StudyPathSection {
  sectionName: string;
  icon: string | null;
  color: string;
  guidebookUrl: string;
  questionSlugs: string[];
}

/**
 * Interface for the study path overview data
 */
export interface StudyPathOverviewData {
  [key: string]: StudyPathSection;
}

/**
 * Extended StudyPath type that includes the overviewData field
 */
export interface StudyPath extends PrismaStudyPath {
  overviewData?: StudyPathOverviewData;
}
