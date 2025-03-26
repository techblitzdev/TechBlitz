import type { Meta, StoryObj } from '@storybook/react';
import { StatsChartData } from './total-question-chart';
import QuestionChart from './total-question-chart';

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

// Create mock data with upward trend
const createUpwardTrendData = (
  count: number,
  step: 'day' | 'week' | 'month',
  startValue: number = 5
): StatsChartData => {
  const dates = generateDates(count, step);
  const result: StatsChartData = {};

  dates.forEach((date, index) => {
    // Increasing trend with some randomness
    const questions = Math.floor(startValue + index * 3 + Math.random() * 4);

    result[date] = {
      totalQuestions: questions,
      tagCounts: {
        javascript: Math.floor(questions * 0.4),
        react: Math.floor(questions * 0.3),
        typescript: Math.floor(questions * 0.2),
        html: Math.floor(questions * 0.1),
      },
      tags: ['javascript', 'react', 'typescript', 'html'],
    };
  });

  return result;
};

// Create mock data with downward trend
const createDownwardTrendData = (
  count: number,
  step: 'day' | 'week' | 'month',
  startValue: number = 40
): StatsChartData => {
  const dates = generateDates(count, step);
  const result: StatsChartData = {};

  dates.forEach((date, index) => {
    // Decreasing trend with some randomness
    const questions = Math.max(0, Math.floor(startValue - index * 2 + Math.random() * 3));

    result[date] = {
      totalQuestions: questions,
      tagCounts: {
        javascript: Math.floor(questions * 0.4),
        react: Math.floor(questions * 0.3),
        typescript: Math.floor(questions * 0.2),
        html: Math.floor(questions * 0.1),
      },
      tags: ['javascript', 'react', 'typescript', 'html'],
    };
  });

  return result;
};

// create mock data with fluctuating trend
const createFluctuatingTrendData = (
  count: number,
  step: 'day' | 'week' | 'month',
  baseline: number = 20
): StatsChartData => {
  const dates = generateDates(count, step);
  const result: StatsChartData = {};

  dates.forEach((date, index) => {
    // Fluctuating pattern with sine wave
    const amplitude = 15;
    const period = count / 3;
    const questions = Math.max(
      0,
      Math.floor(baseline + amplitude * Math.sin((index / period) * Math.PI) + Math.random() * 5)
    );

    result[date] = {
      totalQuestions: questions,
      tagCounts: {
        javascript: Math.floor(questions * 0.4),
        react: Math.floor(questions * 0.3),
        typescript: Math.floor(questions * 0.2),
        html: Math.floor(questions * 0.1),
      },
      tags: ['javascript', 'react', 'typescript', 'html'],
    };
  });

  return result;
};

// Create mock data sets
const dayDataUpward = createUpwardTrendData(14, 'day');
const weekDataDownward = createDownwardTrendData(10, 'week');
const monthDataFluctuating = createFluctuatingTrendData(12, 'month');

function QuestionChartWrapper({
  questionData,
  step,
  backgroundColor,
}: {
  questionData: StatsChartData;
  step: 'day' | 'week' | 'month';
  backgroundColor?: string;
}) {
  return (
    <div className="w-96">
      <QuestionChart questionData={questionData} step={step} backgroundColor={backgroundColor} />
    </div>
  );
}

const meta = {
  title: 'App/Statistics/QuestionChart',
  component: QuestionChartWrapper,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#090909' }],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof QuestionChartWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    questionData: dayDataUpward,
    step: 'day',
    backgroundColor: 'bg-black-100',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows an upward trend in daily questions answered over the past 14 days.',
      },
    },
  },
};

export const WeeklyDownwardTrend: Story = {
  args: {
    questionData: weekDataDownward,
    step: 'week',
    backgroundColor: 'bg-black-100',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows a downward trend in weekly questions answered over the past 10 weeks.',
      },
    },
  },
};

export const MonthlyFluctuating: Story = {
  args: {
    questionData: monthDataFluctuating,
    step: 'month',
    backgroundColor: 'bg-black-100',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows a fluctuating pattern in monthly questions answered over the past 12 months.',
      },
    },
  },
};
