import type { Meta, StoryObj } from '@storybook/react';

import TagsChart from './tags-chart';

// Define types for TagsChart data items
type TagItem = {
  name: string;
  value: number;
};

// Mock data for programming languages tags
const programmingTags: TagItem[] = [
  { name: 'JavaScript', value: 875 },
  { name: 'Python', value: 743 },
  { name: 'CSS', value: 521 },
  { name: 'HTML', value: 489 },
  { name: 'TypeScript', value: 382 },
  { name: 'React', value: 367 },
  { name: 'Node.js', value: 298 },
  { name: 'SQL', value: 276 },
  { name: 'Git', value: 245 },
  { name: 'API', value: 187 },
];

// Mock data for blog category tags
const blogCategoryTags: TagItem[] = [
  { name: 'Tutorials', value: 324 },
  { name: 'Best Practices', value: 218 },
  { name: 'Frameworks', value: 189 },
  { name: 'Security', value: 156 },
  { name: 'Performance', value: 142 },
  { name: 'Web Development', value: 137 },
  { name: 'Mobile', value: 95 },
  { name: 'DevOps', value: 83 },
  { name: 'Career', value: 76 },
  { name: 'AI', value: 68 },
];

// Mock data for trending topics
const trendingTags: TagItem[] = [
  { name: 'Next.js', value: 523 },
  { name: 'TailwindCSS', value: 487 },
  { name: 'AI Tools', value: 412 },
  { name: 'WebAssembly', value: 245 },
  { name: 'Serverless', value: 234 },
  { name: 'GraphQL', value: 187 },
  { name: 'Microservices', value: 165 },
  { name: 'Blockchain', value: 124 },
  { name: 'Kubernetes', value: 98 },
  { name: 'AR/VR', value: 65 },
];

// Mock data for framework popularity
const frameworkTags: TagItem[] = [
  { name: 'React', value: 367 },
  { name: 'Vue', value: 289 },
  { name: 'Angular', value: 234 },
  { name: 'Svelte', value: 189 },
  { name: 'Next.js', value: 176 },
  { name: 'Nuxt', value: 143 },
  { name: 'Astro', value: 112 },
  { name: 'SolidJS', value: 87 },
  { name: 'Ember', value: 54 },
  { name: 'Express', value: 43 },
];

const meta = {
  component: TagsChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[600px] p-4 rounded-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TagsChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: programmingTags,
    backgroundColor: 'bg-black',
    barColor: 'bg-accent',
    title: 'Top 10 Tags',
  },
};

export const BlogCategories: Story = {
  args: {
    data: blogCategoryTags,
    backgroundColor: 'bg-zinc-900',
    barColor: 'bg-accent',
    title: 'Blog Categories',
  },
};

export const TrendingTopics: Story = {
  args: {
    data: trendingTags,
    backgroundColor: 'bg-black',
    barColor: 'bg-accent',
    title: 'Trending Topics This Month',
  },
};

export const Frameworks: Story = {
  args: {
    data: frameworkTags,
    backgroundColor: 'bg-zinc-900',
    barColor: 'bg-accent',
    title: 'Framework Popularity',
  },
};

export const NoTitle: Story = {
  args: {
    data: programmingTags.slice(0, 5),
    backgroundColor: 'bg-black',
    barColor: 'bg-accent',
  },
};

export const CustomBackground: Story = {
  args: {
    data: trendingTags.slice(0, 6),
    backgroundColor: 'bg-indigo-950',
    barColor: 'bg-accent',
    title: 'Custom Background Example',
  },
};
