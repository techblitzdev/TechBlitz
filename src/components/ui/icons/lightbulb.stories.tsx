import type { Meta, StoryObj } from '@storybook/react';

import Lightbulb from './lightbulb';

const meta = {
  component: Lightbulb,
} satisfies Meta<typeof Lightbulb>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
