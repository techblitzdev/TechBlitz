import type { Meta, StoryObj } from '@storybook/react';

import QuestionHistory from './question-history';

const meta = {
  component: QuestionHistory,
} satisfies Meta<typeof QuestionHistory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
