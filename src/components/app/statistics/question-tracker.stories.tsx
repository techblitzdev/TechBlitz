import type { Meta, StoryObj } from '@storybook/react';

import QuestionTracker from '@/components/app/statistics/question-tracker';

const meta = {
  component: QuestionTracker,
} satisfies Meta<typeof QuestionTracker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    stats: {},
    step: 'month',
    range: '7d',
  },
};
