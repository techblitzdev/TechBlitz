import type { Meta, StoryObj } from '@storybook/react';
import QuestionChart from './total-question-chart';
import { StatsChartData } from './total-question-chart';

const meta: Meta<typeof QuestionChart> = {
  title: 'Charts/QuestionChart',
  component: QuestionChart,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-black-100 p-6 rounded-lg" style={{ width: '800px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof QuestionChart>;

// Generate dates for the past week
const generateDates = (days: number) => {
  const dates: string[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    // Format date as "Month Day, Year"
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    dates.push(formattedDate);
  }

  return dates;
};

// Create weekly data
const createWeeklyData = (): StatsChartData => {
  const weekDates = generateDates(7);
  const data: StatsChartData = {};

  weekDates.forEach((date, index) => {
    // Generate increasing count pattern with some randomness
    const baseCount = 20 + index * 5;
    const randomVariation = Math.floor(Math.random() * 10) - 5; // -5 to +5
    const totalQuestions = Math.max(0, baseCount + randomVariation);

    // Generate some tag counts
    const tagCounts: Record<string, number> = {
      javascript: Math.floor(totalQuestions * 0.4),
      react: Math.floor(totalQuestions * 0.3),
      typescript: Math.floor(totalQuestions * 0.2),
      css: Math.floor(totalQuestions * 0.1),
    };

    // Add to data object
    data[date] = {
      totalQuestions,
      tagCounts,
      tags: Object.keys(tagCounts),
    };
  });

  return data;
};

// Create monthly data
const createMonthlyData = (): StatsChartData => {
  const monthDates = generateDates(30);
  const data: StatsChartData = {};

  monthDates.forEach((date, index) => {
    // Generate an upward trend with some fluctuations
    const baseCount = 15 + Math.floor(index * 2.5);
    const randomVariation = Math.floor(Math.random() * 15) - 7; // -7 to +7
    const totalQuestions = Math.max(0, baseCount + randomVariation);

    // Generate some tag counts
    const tagCounts: Record<string, number> = {
      javascript: Math.floor(totalQuestions * 0.35),
      react: Math.floor(totalQuestions * 0.25),
      typescript: Math.floor(totalQuestions * 0.2),
      css: Math.floor(totalQuestions * 0.1),
      node: Math.floor(totalQuestions * 0.1),
    };

    // Add to data object
    data[date] = {
      totalQuestions,
      tagCounts,
      tags: Object.keys(tagCounts),
    };
  });

  return data;
};

// Create mock data with a downward trend
const createDownwardTrendData = (): StatsChartData => {
  const weekDates = generateDates(7);
  const data: StatsChartData = {};

  weekDates.forEach((date, index) => {
    // Generate decreasing count pattern
    const baseCount = 70 - index * 8;
    const randomVariation = Math.floor(Math.random() * 6) - 3; // -3 to +3
    const totalQuestions = Math.max(0, baseCount + randomVariation);

    // Generate some tag counts
    const tagCounts: Record<string, number> = {
      javascript: Math.floor(totalQuestions * 0.4),
      react: Math.floor(totalQuestions * 0.3),
      typescript: Math.floor(totalQuestions * 0.2),
      css: Math.floor(totalQuestions * 0.1),
    };

    // Add to data object
    data[date] = {
      totalQuestions,
      tagCounts,
      tags: Object.keys(tagCounts),
    };
  });

  return data;
};

export const WeeklyData: Story = {
  args: {
    questionData: createWeeklyData(),
    step: 'day',
    backgroundColor: 'bg-black',
  },
};

export const MonthlyData: Story = {
  args: {
    questionData: createMonthlyData(),
    step: 'day',
    backgroundColor: 'bg-black',
  },
};

export const DownwardTrend: Story = {
  args: {
    questionData: createDownwardTrendData(),
    step: 'day',
    backgroundColor: 'bg-black',
  },
};
