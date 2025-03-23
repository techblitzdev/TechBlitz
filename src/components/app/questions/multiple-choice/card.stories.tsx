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
    answer: 'JavaScript',
    handleSelectAnswer: () => {},
    selectedAnswer: undefined,
  },
};

export const Selected: Story = {
  args: {
    index: 1,
    answer: 'JavaScript',
    handleSelectAnswer: () => {},
    selectedAnswer: 'JavaScript',
  },
};

export const CorrectSelected: Story = {
  args: {
    index: 1,
    answer: 'JavaScript',
    handleSelectAnswer: () => {},
    selectedAnswer: 'JavaScript',
    isSubmitted: true,
    isCorrect: true,
  },
};

export const IncorrectSelected: Story = {
  args: {
    index: 1,
    answer: 'JavaScript',
    handleSelectAnswer: () => {},
    selectedAnswer: 'JavaScript',
    isSubmitted: true,
    isCorrect: false,
    correctAnswer: 'ECMAScript',
  },
};

export const CorrectNotSelected: Story = {
  args: {
    index: 1,
    answer: 'ECMAScript',
    handleSelectAnswer: () => {},
    selectedAnswer: 'JavaScript',
    isSubmitted: true,
    isCorrect: false,
    correctAnswer: 'ECMAScript',
  },
};
