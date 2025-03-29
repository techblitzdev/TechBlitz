import type { Meta, StoryObj } from '@storybook/react';
import FasterThanAIAnimation from './animation';
import { useEffect } from 'react';

const meta: Meta<typeof FasterThanAIAnimation> = {
  title: 'App/Questions/FasterThanAI/Animation',
  component: FasterThanAIAnimation,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    onComplete: { action: 'animation completed' },
  },
};

export default meta;
type Story = StoryObj<typeof FasterThanAIAnimation>;

// Simple wrapper to prevent auto-dismiss in Storybook
const AnimationWrapper = (args: any) => {
  useEffect(() => {
    // Clear any timeout to prevent auto-dismiss in Storybook
    const id = setTimeout(() => {}, 100000);
    return () => clearTimeout(id);
  }, []);

  return <FasterThanAIAnimation {...args} />;
};

// Default animation with ChatGPT time
export const WithChatGPTTime: Story = {
  args: {
    aiTime: 12.5,
  },
  render: (args) => <AnimationWrapper {...args} />,
};

// Animation without ChatGPT time
export const WithoutChatGPTTime: Story = {
  args: {
    aiTime: undefined,
  },
  render: (args) => <AnimationWrapper {...args} />,
};

// Animation with very quick ChatGPT time
export const QuickChatGPTTime: Story = {
  args: {
    aiTime: 3.2,
  },
  render: (args) => <AnimationWrapper {...args} />,
};

// Animation with long ChatGPT time
export const LongChatGPTTime: Story = {
  args: {
    aiTime: 45.8,
  },
  render: (args) => <AnimationWrapper {...args} />,
};
