import type { Meta, StoryObj } from '@storybook/react';

import { ChartSplineIcon } from './b-chart-3';

const meta = {
  component: ChartSplineIcon,
} satisfies Meta<typeof ChartSplineIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
