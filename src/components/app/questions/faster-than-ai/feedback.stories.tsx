import type { Meta, StoryObj } from '@storybook/react';
import FasterThanAIFeedback from './feedback';

const meta: Meta<typeof FasterThanAIFeedback> = {
  title: 'App/Questions/FasterThanAI/Feedback',
  component: FasterThanAIFeedback,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[400px] h-[300px] relative">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FasterThanAIFeedback>;

// User beat AI with correct answer
export const BeatAI: Story = {
  args: {
    aiTime: 15,
    userTime: 10.5,
    wasCorrect: true,
  },
};

// User answered correctly but was slower than AI
export const AIWasFaster: Story = {
  args: {
    aiTime: 8.2,
    userTime: 12.4,
    wasCorrect: true,
  },
};

// User answered incorrectly
export const IncorrectAnswer: Story = {
  args: {
    aiTime: 10,
    userTime: 15.7,
    wasCorrect: false,
  },
};

// User barely beat AI
export const CloseWin: Story = {
  args: {
    aiTime: 12,
    userTime: 11.8,
    wasCorrect: true,
  },
};

// User was barely slower than AI
export const CloseLoss: Story = {
  args: {
    aiTime: 9.2,
    userTime: 9.5,
    wasCorrect: true,
  },
};
