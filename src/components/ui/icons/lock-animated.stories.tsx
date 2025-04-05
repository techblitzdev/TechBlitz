import type { Meta, StoryObj } from '@storybook/react';

import { UilPadlock } from './lock-animated';

const meta = {
  component: UilPadlock,
} satisfies Meta<typeof UilPadlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 64,
  },
};
