import type { Meta, StoryObj } from '@storybook/react';

import { DatePicker } from './date-picker';

const meta = {
  component: DatePicker,
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: new Date(),
    setDate: () => {},
  },
};
