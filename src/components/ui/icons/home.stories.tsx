import type { Meta, StoryObj } from '@storybook/react';

import { HomeIcon } from './home';

const meta = {
  component: HomeIcon,
} satisfies Meta<typeof HomeIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
