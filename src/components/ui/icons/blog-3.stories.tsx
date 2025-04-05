import type { Meta, StoryObj } from '@storybook/react';

import Blog from './blog-3';

const meta = {
  component: Blog,
} satisfies Meta<typeof Blog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 24,
    height: 24,
  },
};
