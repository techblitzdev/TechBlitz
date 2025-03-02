'use client';

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

// Track registration status
let isRegistered = false;

/**
 * Ensures Chart.js components are properly registered
 * This should be called in a useEffect hook in client components
 */
export function ensureChartJsRegistered() {
  if (typeof window === 'undefined') {
    return false; // Don't register on server
  }

  if (isRegistered) {
    return true; // Already registered
  }

  try {
    // Clean registration by unregistering first
    try {
      ChartJS.unregister(CategoryScale);
      ChartJS.unregister(LinearScale);
    } catch (e) {
      // Ignore errors from unregistering
    }

    // Register all components
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

    // Mark as registered
    isRegistered = true;
    console.log('ChartJS components registered successfully');
    return true;
  } catch (error) {
    console.error('Failed to register ChartJS components:', error);
    return false;
  }
}

/**
 * Gets chart options with dark mode styling
 */
export function getDarkModeChartOptions() {
  return {
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
}
