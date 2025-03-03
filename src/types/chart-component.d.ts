import { FC } from 'react';

declare module '@/components/app/admin/chart-component' {
  export type ChartType = 'line' | 'bar';

  export interface ChartComponentProps {
    data: {
      labels: string[];
      counts: number[];
    };
    chartType: ChartType;
    title: string;
  }

  export const ChartComponent: FC<ChartComponentProps>;
  export function initializeChartJS(): void;
}
