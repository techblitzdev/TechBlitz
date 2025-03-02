'use client';

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Define chart types
type ChartType = 'line' | 'bar';

interface ChartComponentProps {
  data: {
    labels: string[];
    counts: number[];
  };
  chartType: ChartType;
  title: string;
}

// Register Chart.js components
export function initializeChartJS() {
  try {
    // Check if already registered to avoid duplicate registration
    const scales = ChartJS.registry.scales;
    const hasCategory = scales.get('category');
    const hasLinear = scales.get('linear');

    if (!hasCategory || !hasLinear) {
      console.log('Registering Chart.js components...');
      ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        BarElement,
        Title,
        Tooltip,
        Legend,
        Filler
      );
    }
  } catch (error) {
    console.error('Error initializing Chart.js:', error);
    // Register anyway as fallback
    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      BarElement,
      Title,
      Tooltip,
      Legend,
      Filler
    );
  }
}

export default function ChartComponent({ data, chartType, title }: ChartComponentProps) {
  const [initialized, setInitialized] = useState(false);

  // Initialize Chart.js when component mounts
  useEffect(() => {
    initializeChartJS();
    setInitialized(true);

    return () => {
      // No cleanup needed
    };
  }, []);

  if (!initialized) {
    return (
      <div className="h-64 flex items-center justify-center bg-black-75 rounded">
        <p className="text-gray-400">Initializing chart...</p>
      </div>
    );
  }

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#101010',
        titleColor: '#ffffff',
        bodyColor: '#e2e2e2',
        borderColor: '#333333',
        borderWidth: 1,
        padding: 10,
        boxPadding: 4,
        usePointStyle: true,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(50, 50, 50, 0.2)',
        },
        ticks: {
          color: '#a3a3a3',
        },
      },
      y: {
        grid: {
          color: 'rgba(50, 50, 50, 0.2)',
        },
        ticks: {
          color: '#a3a3a3',
          precision: 0,
        },
        beginAtZero: true,
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
  };

  // Chart data
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'New Users',
        data: data.counts,
        borderColor: '#3b82f6',
        backgroundColor:
          chartType === 'line' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.7)',
        borderWidth: 2,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 1,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.3,
        fill: chartType === 'line',
      },
    ],
  };

  // Wrap in error boundary
  try {
    return chartType === 'line' ? (
      <Line options={options} data={chartData} />
    ) : (
      <Bar options={options} data={chartData} />
    );
  } catch (error) {
    console.error('Error rendering chart:', error);
    return (
      <div className="h-64 flex items-center justify-center bg-black-75 rounded">
        <p className="text-gray-400">Error rendering chart. Please try again.</p>
      </div>
    );
  }
}
