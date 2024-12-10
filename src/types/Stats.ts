export interface StatsChartData {
  [month: string]: {
    totalQuestions: number;
    tagCounts: Record<string, number>;
  };
}
