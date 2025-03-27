import type { Meta, StoryObj } from '@storybook/react';

import { BarList } from './bar-list-chart';

// Define the Bar item type
type BarItem = {
  name: string;
  value: number;
  href?: string;
  key?: string;
};

// Mock data for programming languages popularity
const programmingLanguagesData: BarItem[] = [
  { name: 'JavaScript', value: 69.7 },
  { name: 'Python', value: 68.0 },
  { name: 'TypeScript', value: 42.3 },
  { name: 'Java', value: 35.4 },
  { name: 'C#', value: 30.1 },
  { name: 'PHP', value: 20.7 },
  { name: 'C++', value: 20.2 },
  { name: 'Go', value: 14.5 },
  { name: 'Rust', value: 12.2 },
  { name: 'Kotlin', value: 9.1 },
];

// Mock data for tech stack usage with links
const techStackData: BarItem[] = [
  { name: 'React', value: 45.3, href: 'https://reactjs.org' },
  { name: 'Node.js', value: 39.1, href: 'https://nodejs.org' },
  { name: 'Next.js', value: 30.5, href: 'https://nextjs.org' },
  { name: 'PostgreSQL', value: 27.8, href: 'https://postgresql.org' },
  { name: 'MongoDB', value: 25.2, href: 'https://mongodb.com' },
  { name: 'Express', value: 23.9, href: 'https://expressjs.com' },
  { name: 'Redux', value: 20.1, href: 'https://redux.js.org' },
  { name: 'GraphQL', value: 16.7, href: 'https://graphql.org' },
  { name: 'TypeORM', value: 9.3, href: 'https://typeorm.io' },
  { name: 'Prisma', value: 8.7, href: 'https://prisma.io' },
];

// Mock data for website analytics
const analyticsData: BarItem[] = [
  { name: 'Blog Posts', value: 1428 },
  { name: 'Landing Pages', value: 976 },
  { name: 'Documentation', value: 689 },
  { name: 'Tutorials', value: 572 },
  { name: 'API Reference', value: 412 },
];

// Mock data with very disparate values
const disparateData: BarItem[] = [
  { name: 'Category A', value: 1250 },
  { name: 'Category B', value: 800 },
  { name: 'Category C', value: 275 },
  { name: 'Category D', value: 120 },
  { name: 'Category E', value: 2 },
];

// Mock data for benchmarks
const benchmarkData: BarItem[] = [
  { name: 'Project Alpha', value: 3.42, key: 'alpha' },
  { name: 'Project Beta', value: 2.78, key: 'beta' },
  { name: 'Project Gamma', value: 5.14, key: 'gamma' },
  { name: 'Project Delta', value: 1.23, key: 'delta' },
];

// Mock data for market share
const marketShareData: BarItem[] = [
  { name: 'Company A', value: 37.5 },
  { name: 'Company B', value: 28.3 },
  { name: 'Company C', value: 15.2 },
  { name: 'Company D', value: 10.8 },
  { name: 'Others', value: 8.2 },
];

// Mock data for revenue
const revenueData: BarItem[] = [
  { name: 'Q1 2023', value: 1250000 },
  { name: 'Q2 2023', value: 1450000 },
  { name: 'Q3 2023', value: 1320000 },
  { name: 'Q4 2023', value: 1820000 },
];

const meta: Meta<typeof BarList> = {
  title: 'Charts/BarList',
  component: BarList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-black border border-black-50 p-6 w-[600px] rounded">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: programmingLanguagesData,
    valueFormatter: (value: number) => `${value}%`,
  },
};

export const WithLinks: Story = {
  args: {
    data: techStackData,
    valueFormatter: (value: number) => `${value}%`,
  },
};

export const Analytics: Story = {
  args: {
    data: analyticsData,
    valueFormatter: (value: number) => value.toLocaleString(),
  },
};

export const AscendingOrder: Story = {
  args: {
    data: programmingLanguagesData,
    valueFormatter: (value: number) => `${value}%`,
    sortOrder: 'ascending',
  },
};

export const NoSorting: Story = {
  args: {
    data: programmingLanguagesData,
    valueFormatter: (value: number) => `${value}%`,
    sortOrder: 'none',
  },
};

export const DisparateValues: Story = {
  args: {
    data: disparateData,
    valueFormatter: (value: number) => value.toLocaleString(),
  },
};

export const WithAnimation: Story = {
  args: {
    data: programmingLanguagesData,
    valueFormatter: (value: number) => `${value}%`,
    showAnimation: true,
  },
};

export const Interactive: Story = {
  args: {
    data: programmingLanguagesData,
    valueFormatter: (value: number) => `${value}%`,
    onValueChange: (item: BarItem) => console.log(`Selected: ${item.name} - ${item.value}%`),
  },
};

export const Benchmarks: Story = {
  args: {
    data: benchmarkData,
    valueFormatter: (value: number) => `${value.toFixed(2)} ms`,
  },
};

export const MarketShare: Story = {
  args: {
    data: marketShareData,
    valueFormatter: (value: number) => `${value}%`,
  },
};

export const Revenue: Story = {
  args: {
    data: revenueData,
    valueFormatter: (value: number) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(value),
  },
};
