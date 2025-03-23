import type { Meta, StoryObj } from '@storybook/react';

import FeatureIconGrid from './feature-icon-grid';
import { Code } from 'lucide-react';
import RoadmapIcon from '@/components/ui/icons/roadmap';
import MaterialSymbolsFilterListRounded from '@/components/ui/icons/filter';
import Document from '@/components/ui/icons/document';

const meta = {
  component: FeatureIconGrid,
} satisfies Meta<typeof FeatureIconGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        title: 'Interactive Challenges',
        description:
          'Practice with hands-on coding challenges that simulate real-world scenarios. Build skills while solving problems that matter.',
        icon: <Code width="1.5em" height="1.5em" />,
      },
      {
        title: 'Structured Learning Paths',
        description:
          'Follow a simple, structured learning path to boost your coding skills. Opt-in to receive daily reminders to complete it!',
        icon: <RoadmapIcon height="1.5em" width="1.5em" />,
      },
      {
        title: 'Generate Code Reports',
        description:
          "Don't just code blindly. Generate code reports to track your progress and understand your weaknesses.",
        icon: <Document width="1.5em" height="1.5em" />,
      },
      {
        title: 'Advanced Filtering',
        description:
          'Easily navigate through our vast library of coding challenges with our advanced filtering options.',
        icon: <MaterialSymbolsFilterListRounded className="size-6" />,
      },
    ],

    paddingTop: 'pt-10',
    paddingBottom: 'pb-10',
    borderTop: true,
  },
};
