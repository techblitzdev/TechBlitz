import type { Meta, StoryObj } from '@storybook/react';

import { AreaChart } from './area-chart';

// Helper function to generate dates for the past n days/weeks/months
const generateDates = (count: number, step: 'day' | 'week' | 'month'): string[] => {
  const dates: string[] = [];
  const now = new Date();

  for (let i = count - 1; i >= 0; i--) {
    const date = new Date();

    if (step === 'day') {
      date.setDate(now.getDate() - i);
    } else if (step === 'week') {
      date.setDate(now.getDate() - i * 7);
    } else {
      date.setMonth(now.getMonth() - i);
    }

    // Format date as "Apr 15"
    dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  }

  return dates;
};

// Create upward trend data
const createUpwardTrendData = (count: number, startValue: number = 5) => {
  const dates = generateDates(count, 'day');
  return dates.map((date, index) => {
    // Increasing trend with some randomness
    const value = Math.floor(startValue + index * 3 + Math.random() * 4);

    return {
      date,
      value,
      secondary: Math.floor(value * 0.7),
    };
  });
};

// Create downward trend data
const createDownwardTrendData = (count: number, startValue: number = 40) => {
  const dates = generateDates(count, 'week');
  return dates.map((date, index) => {
    // Decreasing trend with some randomness
    const value = Math.max(0, Math.floor(startValue - index * 2 + Math.random() * 3));

    return {
      date,
      value,
      secondary: Math.floor(value * 0.6),
    };
  });
};

// Create fluctuating trend data
const createFluctuatingTrendData = (count: number, baseline: number = 20) => {
  const dates = generateDates(count, 'month');
  return dates.map((date, index) => {
    // Fluctuating pattern with sine wave
    const amplitude = 15;
    const period = count / 3;
    const value = Math.max(
      0,
      Math.floor(baseline + amplitude * Math.sin((index / period) * Math.PI) + Math.random() * 5)
    );

    return {
      date,
      value,
      secondary: Math.floor(value * 0.65),
    };
  });
};

// Generate mock data
const dailyUpwardData = createUpwardTrendData(14);
const weeklyDownwardData = createDownwardTrendData(10);
const monthlyFluctuatingData = createFluctuatingTrendData(12);

// Format value for the chart
const valueFormatter = (value: number) => {
  return value.toFixed(0);
};

const ChartWrapper = (props: React.ComponentProps<typeof AreaChart>) => {
  return (
    <div className="bg-black-100 p-4 rounded-lg" style={{ width: '600px', height: '400px' }}>
      <AreaChart {...props} />
    </div>
  );
};

const meta = {
  title: 'Charts/AreaChart',
  component: ChartWrapper,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#090909' }],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChartWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DailyUpwardTrend: Story = {
  args: {
    data: dailyUpwardData,
    index: 'date',
    categories: ['value'],
    colors: ['blue'],
    valueFormatter,
    showXAxis: true,
    showYAxis: true,
    showGridLines: true,
    yAxisWidth: 40,
    showLegend: false,
    showTooltip: true,
    fill: 'gradient',
    connectNulls: true,
    autoMinValue: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows an upward trend in daily data over the past 14 days using a gradient fill.',
      },
    },
  },
};

export const WeeklyDownwardTrend: Story = {
  args: {
    data: weeklyDownwardData,
    index: 'date',
    categories: ['value'],
    colors: ['pink'],
    valueFormatter,
    showXAxis: true,
    showYAxis: true,
    showGridLines: true,
    yAxisWidth: 40,
    showLegend: false,
    showTooltip: true,
    fill: 'solid',
    connectNulls: true,
    autoMinValue: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows a downward trend in weekly data over the past 10 weeks using a solid fill.',
      },
    },
  },
};

export const MonthlyFluctuating: Story = {
  args: {
    data: monthlyFluctuatingData,
    index: 'date',
    categories: ['value'],
    colors: ['violet'],
    valueFormatter,
    showXAxis: true,
    showYAxis: true,
    showGridLines: true,
    yAxisWidth: 40,
    showLegend: false,
    showTooltip: true,
    fill: 'gradient',
    connectNulls: true,
    autoMinValue: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows a fluctuating pattern in monthly data over the past 12 months.',
      },
    },
  },
};

export const MultipleCategories: Story = {
  args: {
    data: dailyUpwardData,
    index: 'date',
    categories: ['value', 'secondary'],
    colors: ['blue', 'emerald'],
    valueFormatter,
    showXAxis: true,
    showYAxis: true,
    showGridLines: true,
    yAxisWidth: 40,
    showLegend: true,
    showTooltip: true,
    fill: 'gradient',
    connectNulls: true,
    autoMinValue: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows multiple data series to compare primary and secondary values.',
      },
    },
  },
};

export const BarLikeStyle: Story = {
  args: {
    data: weeklyDownwardData,
    index: 'date',
    categories: ['value'],
    colors: ['amber'],
    valueFormatter,
    showXAxis: true,
    showYAxis: true,
    showGridLines: true,
    yAxisWidth: 40,
    showLegend: false,
    showTooltip: true,
    fill: 'solid',
    tickGap: 40,
    connectNulls: true,
    autoMinValue: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows a bar-like appearance with solid fill and increased spacing between data points.',
      },
    },
  },
};
