import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';

const meta = {
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Button Default',
    special: false,
    fullWidth: false,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button Secondary',
    special: false,
    fullWidth: true,
  },
};

export const Premium: Story = {
  args: {
    variant: 'premium',
    children: 'Button Premium',
    special: true,
    fullWidth: true,
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Button Outline',
    special: false,
    fullWidth: true,
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Button Ghost',
    special: false,
    fullWidth: true,
  },
};
