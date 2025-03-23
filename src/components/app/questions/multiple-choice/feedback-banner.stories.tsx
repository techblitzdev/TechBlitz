import type { Meta, StoryObj } from '@storybook/react';

import FeedbackBanner from './feedback-banner';

const meta = {
  component: FeedbackBanner,
} satisfies Meta<typeof FeedbackBanner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isCorrect: true,
    feedbackMessage: 'Great job!',
    xpIncrease: 15,
  },
};

export const Incorrect: Story = {
  args: {
    isCorrect: false,
    feedbackMessage: 'Try again!',
    xpIncrease: 2,
  },
};
