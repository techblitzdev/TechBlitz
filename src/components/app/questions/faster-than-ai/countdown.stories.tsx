import type { Meta, StoryObj } from '@storybook/react';

import Countdown from './countdown';

const meta: Meta<typeof Countdown> = {
  title: 'App/Questions/FasterThanAI/Countdown',
  component: Countdown,
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

type Story = StoryObj<typeof Countdown>;

// Default story with user still trying to beat ChatGPT
export const InProgress: Story = {
  args: {
    aiTime: 15,
    isVisible: true,
    isSubmitted: false,
    wasCorrect: undefined,
  },
  parameters: {
    mockdate: {
      now: new Date().getTime() + 5000, // 5 seconds elapsed
    },
  },
};

// Story showing user has almost reached ChatGPT time
export const AlmostOutOfTime: Story = {
  args: {
    aiTime: 15,
    isVisible: true,
    isSubmitted: false,
    wasCorrect: undefined,
  },
  parameters: {
    mockdate: {
      now: new Date().getTime() + 13000, // 13 seconds elapsed
    },
  },
};

// Story showing user beat ChatGPT with correct answer
export const BeatChatGPTWithCorrectAnswer: Story = {
  args: {
    aiTime: 15,
    isVisible: true,
    isSubmitted: true,
    wasCorrect: true,
  },
  parameters: {
    mockdate: {
      now: new Date().getTime() + 10000, // 10 seconds elapsed
    },
  },
};

// Story showing ChatGPT was faster but user still got correct answer
export const ChatGPTWasQuicker: Story = {
  args: {
    aiTime: 15,
    isVisible: true,
    isSubmitted: true,
    wasCorrect: true,
  },
  parameters: {
    mockdate: {
      now: new Date().getTime() + 20000, // 20 seconds elapsed
    },
  },
};

// Story showing user answered incorrectly
export const IncorrectAnswer: Story = {
  args: {
    aiTime: 15,
    isVisible: true,
    isSubmitted: true,
    wasCorrect: false,
  },
  parameters: {
    mockdate: {
      now: new Date().getTime() + 18000, // 18 seconds elapsed
    },
  },
};

// Story with very short ChatGPT time (Quick Question)
export const QuickQuestion: Story = {
  args: {
    aiTime: 3,
    isVisible: true,
    isSubmitted: false,
    wasCorrect: undefined,
  },
  parameters: {
    mockdate: {
      now: new Date().getTime() + 1500, // 1.5 seconds elapsed
    },
  },
};

// Story with very long ChatGPT time (Difficult Question)
export const DifficultQuestion: Story = {
  args: {
    aiTime: 45,
    isVisible: true,
    isSubmitted: false,
    wasCorrect: undefined,
  },
  parameters: {
    mockdate: {
      now: new Date().getTime() + 15000, // 15 seconds elapsed
    },
  },
};
