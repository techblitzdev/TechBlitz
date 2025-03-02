'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Define chart types
type ChartType = 'line' | 'bar';

interface UserChartProps {
  data: {
    labels: string[];
    counts: number[];
  };
  title: string;
}

// Create a loading placeholder component
const ChartPlaceholder = ({ title = 'User Chart' }: { title?: string }) => (
  <div className="h-64 flex items-center justify-center bg-black-75 rounded">
    <p className="text-gray-400">Loading {title}...</p>
  </div>
);

// Dynamically import the chart component with SSR disabled
const ChartComponent = dynamic(
  () => import('./chart-component').then((mod) => mod.ChartComponent),
  {
    ssr: false,
    loading: () => <ChartPlaceholder />,
  }
);

export default function UserChart({ data, title }: UserChartProps) {
  const [chartType, setChartType] = useState<ChartType>('line');

  return (
    <div className="bg-[#000000] border border-black-50 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setChartType('line')}
            className={`px-3 py-1 text-xs rounded ${
              chartType === 'line'
                ? 'bg-primary text-white'
                : 'bg-black-75 text-gray-300 hover:bg-black-50'
            }`}
          >
            Line
          </button>
          <button
            type="button"
            onClick={() => setChartType('bar')}
            className={`px-3 py-1 text-xs rounded ${
              chartType === 'bar'
                ? 'bg-primary text-white'
                : 'bg-black-75 text-gray-300 hover:bg-black-50'
            }`}
          >
            Bar
          </button>
        </div>
      </div>

      <div className="h-64">
        <ChartComponent data={data} chartType={chartType} title={title} />
      </div>
    </div>
  );
}
