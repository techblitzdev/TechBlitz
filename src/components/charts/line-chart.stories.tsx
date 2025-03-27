import type { Meta, StoryObj } from '@storybook/react';
import { LineChart } from './line-chart';
import Tooltip from './tooltip';

// Generate mock data for the past 7 days
const generateMockData = () => {
  const today = new Date();
  const data = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    // Format date as YYYY-MM-DD
    const formattedDate = date.toISOString().split('T')[0];

    // Generate a random value between 10 and 100
    const questions = Math.floor(Math.random() * 91) + 10;

    data.push({
      date: formattedDate,
      questions: questions,
    });
  }

  return data;
};

// Mock data with a clear trend
const mockTrendData = [
  { date: '2023-06-01', questions: 15 },
  { date: '2023-06-02', questions: 25 },
  { date: '2023-06-03', questions: 32 },
  { date: '2023-06-04', questions: 40 },
  { date: '2023-06-05', questions: 52 },
  { date: '2023-06-06', questions: 58 },
  { date: '2023-06-07', questions: 65 },
];

// Mock data with fluctuations
const mockFluctuatingData = [
  { date: '2023-06-01', questions: 45 },
  { date: '2023-06-02', questions: 30 },
  { date: '2023-06-03', questions: 60 },
  { date: '2023-06-04', questions: 25 },
  { date: '2023-06-05', questions: 70 },
  { date: '2023-06-06', questions: 40 },
  { date: '2023-06-07', questions: 55 },
];

// Generate dynamic data for each story render
const dynamicData = generateMockData();

const meta: Meta<typeof LineChart> = {
  title: 'Charts/LineChart',
  component: LineChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-black border border-black-50 p-6 w-[750px] h-full">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LineChart>;

export const Default: Story = {
  args: {
    data: dynamicData,
    index: 'date',
    categories: ['questions'],
    colors: ['blue'],
    valueFormatter: (value: number) => value.toString(),
    showXAxis: true,
    showYAxis: true,
    showGridLines: true,
    showLegend: false,
    showTooltip: true,
    customTooltip: (props) => <Tooltip {...props} />,
    tickGap: 20,
    connectNulls: true,
    autoMinValue: true,
  },
};

export const UpwardTrend: Story = {
  args: {
    ...Default.args,
    data: mockTrendData,
  },
};

export const Fluctuating: Story = {
  args: {
    ...Default.args,
    data: mockFluctuatingData,
  },
};

export const MultipleSeries: Story = {
  args: {
    ...Default.args,
    data: dynamicData.map((item) => ({
      ...item,
      completedQuestions: Math.floor(item.questions * 0.7),
    })),
    categories: ['questions', 'completedQuestions'],
    colors: ['cyan', 'emerald'],
    showLegend: true,
  },
};

export const NoGrid: Story = {
  args: {
    ...Default.args,
    showGridLines: false,
  },
};

export const CustomColors: Story = {
  args: {
    ...Default.args,
    colors: ['blue', 'pink', 'amber'],
  },
};

export const AccentColor: Story = {
  args: {
    ...Default.args,
    colors: ['accent'],
  },
};
