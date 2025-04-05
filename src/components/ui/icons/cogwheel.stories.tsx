import type { Meta, StoryObj } from '@storybook/react';

import { SettingsGearIcon } from './cogwheel';

const meta = {
  component: SettingsGearIcon,
} satisfies Meta<typeof SettingsGearIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
