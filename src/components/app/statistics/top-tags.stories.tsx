import type { Meta, StoryObj } from '@storybook/react';

import TopTags from './top-tags';

const meta = {
  component: TopTags,
} satisfies Meta<typeof TopTags>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
