import { STATISTICS_STEPS, STEPS } from '@/utils/constants/statistics-filters';

export type StatsChartData = {
  [key: string]: {
    totalQuestions: number;
    tagCounts: Record<string, number>;
    tags: string[];
  };
};

export type StatsConstants = (typeof STATISTICS_STEPS)[number]; // { value: 'last-7-days', label: 'Last 7 days' }

// used to get the type of the elements in the STEPS array
export type StatsSteps = (typeof STEPS)[number]; // '7d' | '30d' | '90d'
