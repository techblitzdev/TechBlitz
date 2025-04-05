import type { Meta, StoryObj } from '@storybook/react';

import FileText from './file-text';

const meta = {
  component: FileText,
} satisfies Meta<typeof FileText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
