import type { Meta, StoryObj } from '@storybook/react';
import { SparkAreaChart, SparkLineChart, SparkBarChart } from './spark-chart';

// Generate mock data for the past 7 days
const generateMockData = () => {
  const today = new Date();
  const data = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    // Format date as YYYY-MM-DD
    const formattedDate = date.toISOString().split('T')[0];

    // Generate random values between 10 and 100
    const value1 = Math.floor(Math.random() * 91) + 10;
    const value2 = Math.floor(Math.random() * 91) + 10;

    data.push({
      date: formattedDate,
      value: value1,
      secondValue: value2,
    });
  }

  return data;
};

// Mock data with a clear upward trend
const trendingUpData = [
  { date: '2023-06-01', value: 15, secondValue: 10 },
  { date: '2023-06-02', value: 25, secondValue: 18 },
  { date: '2023-06-03', value: 32, secondValue: 22 },
  { date: '2023-06-04', value: 40, secondValue: 28 },
  { date: '2023-06-05', value: 52, secondValue: 35 },
  { date: '2023-06-06', value: 58, secondValue: 42 },
  { date: '2023-06-07', value: 65, secondValue: 50 },
];

// Mock data with a clear downward trend
const trendingDownData = [
  { date: '2023-06-01', value: 65, secondValue: 50 },
  { date: '2023-06-02', value: 58, secondValue: 42 },
  { date: '2023-06-03', value: 52, secondValue: 35 },
  { date: '2023-06-04', value: 40, secondValue: 28 },
  { date: '2023-06-05', value: 32, secondValue: 22 },
  { date: '2023-06-06', value: 25, secondValue: 18 },
  { date: '2023-06-07', value: 15, secondValue: 10 },
];

// Mock data with fluctuations
const fluctuatingData = [
  { date: '2023-06-01', value: 45, secondValue: 30 },
  { date: '2023-06-02', value: 30, secondValue: 45 },
  { date: '2023-06-03', value: 60, secondValue: 25 },
  { date: '2023-06-04', value: 25, secondValue: 55 },
  { date: '2023-06-05', value: 70, secondValue: 35 },
  { date: '2023-06-06', value: 40, secondValue: 60 },
  { date: '2023-06-07', value: 55, secondValue: 40 },
];

// Generate dynamic data for each story render
const dynamicData = generateMockData();

// Common decorator for all stories
const chartDecorator = (Story: React.ComponentType) => (
  <div className="space-y-6 p-6 bg-gray-950">
    <div className="border border-black-50 p-4 rounded">
      <h3 className="text-white text-sm font-medium mb-2">Chart</h3>
      <Story />
    </div>
  </div>
);

// Default export for the main SparkAreaChart
const meta: Meta<typeof SparkAreaChart> = {
  title: 'Charts/SparkAreaChart',
  component: SparkAreaChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [chartDecorator],
};

export default meta;

// Type for SparkAreaChart stories
type SparkAreaChartStory = StoryObj<typeof SparkAreaChart>;

// SparkAreaChart Stories
export const Default: SparkAreaChartStory = {
  args: {
    data: dynamicData,
    index: 'date',
    categories: ['value'],
    colors: ['cyan'],
    fill: 'gradient',
    className: 'h-40 w-96',
  },
};

export const AccentColor: SparkAreaChartStory = {
  args: {
    ...Default.args,
    colors: ['accent'],
  },
};

export const TrendingUp: SparkAreaChartStory = {
  args: {
    ...Default.args,
    data: trendingUpData,
  },
};

export const TrendingDown: SparkAreaChartStory = {
  args: {
    ...Default.args,
    data: trendingDownData,
    colors: ['amber'],
  },
};

export const MultipleSeries: SparkAreaChartStory = {
  args: {
    ...Default.args,
    categories: ['value', 'secondValue'],
    colors: ['cyan', 'emerald'],
  },
};

export const SolidFill: SparkAreaChartStory = {
  args: {
    ...Default.args,
    fill: 'solid',
  },
};

export const NoFill: SparkAreaChartStory = {
  args: {
    ...Default.args,
    fill: 'none',
  },
};

export const Stacked: SparkAreaChartStory = {
  args: {
    ...MultipleSeries.args,
    type: 'stacked',
  },
};

/**
 * SparkLineChart Stories
 */
const lineChartMeta: Meta<typeof SparkLineChart> = {
  title: 'Charts/SparkLineChart',
  component: SparkLineChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [chartDecorator],
};

export const LineChartDefault: StoryObj<typeof SparkLineChart> = {
  args: {
    data: dynamicData,
    index: 'date',
    categories: ['value'],
    colors: ['cyan'],
    className: 'h-40 w-96',
  },
};

export const LineChartTrendingUp: StoryObj<typeof SparkLineChart> = {
  args: {
    ...LineChartDefault.args,
    data: trendingUpData,
    colors: ['emerald'],
  },
};

export const LineChartTrendingDown: StoryObj<typeof SparkLineChart> = {
  args: {
    ...LineChartDefault.args,
    data: trendingDownData,
    colors: ['pink'],
  },
};

export const LineChartFluctuating: StoryObj<typeof SparkLineChart> = {
  args: {
    ...LineChartDefault.args,
    data: fluctuatingData,
  },
};

export const LineChartMultipleSeries: StoryObj<typeof SparkLineChart> = {
  args: {
    ...LineChartDefault.args,
    categories: ['value', 'secondValue'],
    colors: ['cyan', 'amber'],
  },
};

/**
 * SparkBarChart Stories
 */
const barChartMeta: Meta<typeof SparkBarChart> = {
  title: 'Charts/SparkBarChart',
  component: SparkBarChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [chartDecorator],
};

export const BarChartDefault: StoryObj<typeof SparkBarChart> = {
  args: {
    data: dynamicData,
    index: 'date',
    categories: ['value'],
    colors: ['cyan'],
    className: 'h-12 w-full',
  },
};

export const BarChartTrendingUp: StoryObj<typeof SparkBarChart> = {
  args: {
    ...BarChartDefault.args,
    data: trendingUpData,
  },
};

export const BarChartTrendingDown: StoryObj<typeof SparkBarChart> = {
  args: {
    ...BarChartDefault.args,
    data: trendingDownData,
    colors: ['amber'],
  },
};

export const BarChartMultipleSeries: StoryObj<typeof SparkBarChart> = {
  args: {
    ...BarChartDefault.args,
    categories: ['value', 'secondValue'],
    colors: ['blue', 'emerald'],
  },
};

export const BarChartStacked: StoryObj<typeof SparkBarChart> = {
  args: {
    ...BarChartMultipleSeries.args,
    type: 'stacked',
  },
};
