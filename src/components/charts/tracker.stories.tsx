import type { Meta, StoryObj } from '@storybook/react';

import { Tracker } from './tracker';

const meta = {
  component: Tracker,
} satisfies Meta<typeof Tracker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [
      {
        color: '#000000',
        tooltip: 'Tooltip',
        hoverEffect: true,
      },
    ],
    defaultBackgroundColor: '#000000',
  },
};
