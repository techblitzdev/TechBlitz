import type { Meta, StoryObj } from '@storybook/react';

import QuestionHistory from './question-history';
import { Suspense } from 'react';

function QuestionHistoryStory() {
  return (
    <Suspense>
      <QuestionHistory />
    </Suspense>
  );
}

const meta = {
  component: QuestionHistoryStory,
} satisfies Meta<typeof QuestionHistoryStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
