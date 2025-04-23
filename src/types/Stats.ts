import { STEPS } from '@/utils/constants';
import { StatisticsReport } from '@prisma/client';
import type { Question } from '@/types';

export type StatsChartData = {
  [key: string]: {
    totalQuestions: number;
    tagCounts: Record<string, number>;
    tags: string[];
  };
};

export type StepRange = 'day' | 'week' | 'month';

// used to get the type of the elements in the STEPS array
export type StatsSteps = (typeof STEPS)[number]; // '7d' | '30d' | '90d'

export type StatsReport = StatisticsReport & {
  questions: Question[];
};
