import type { Meta, StoryObj } from '@storybook/react';

import { RouteIcon } from './map';

const meta = {
  component: RouteIcon,
} satisfies Meta<typeof RouteIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
