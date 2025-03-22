import type { Meta, StoryObj } from '@storybook/react';

import Card from './card';

const meta = {
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    index: 1,
    answer: 'What does JS stand for?',
    handleSelectAnswer: () => {},
    selectedAnswer: 'JavaScript',
  },
};
