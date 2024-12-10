export type StatsChartData = {
  [key: string]: {
    totalQuestions: number;
    tagCounts: Record<string, number>;
    tags: string[];
  };
};
