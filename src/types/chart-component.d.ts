import { FC } from 'react';

type ChartType = 'line' | 'bar';

interface ChartComponentProps {
  data: {
    labels: string[];
    counts: number[];
  };
  chartType: ChartType;
  title: string;
}

declare module './components/app/admin/chart-component' {
  export const ChartComponent: FC<ChartComponentProps>;
  export function initializeChartJS(): void;
}
