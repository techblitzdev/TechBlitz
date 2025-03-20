import type { Meta, StoryObj } from '@storybook/react';

import AnimatedSpan from './animated-span';

const meta = {
  component: AnimatedSpan,
} satisfies Meta<typeof AnimatedSpan>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'Animated Span',
  },
};
