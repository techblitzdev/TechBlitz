import type { Meta, StoryObj } from '@storybook/react';

import Flag from './flag';

const meta = {
  component: Flag,
} satisfies Meta<typeof Flag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: {},
    height: {},
  },
};
