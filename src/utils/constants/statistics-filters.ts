import type { StatsSteps, StepRange } from '@/types';

export const STEPS = ['7d', '30d', '90d'] as const;

export const STATISTICS: Record<
  StatsSteps,
  {
    label: string;
    value: StatsSteps;
    step: StepRange;
  }
> = {
  '7d': {
    label: 'Last 7 days',
    value: '7d',
    step: 'day',
  },
  '30d': {
    label: 'Last 30 days',
    value: '30d',
    step: 'day',
  },
  '90d': {
    label: 'Last 3 months',
    value: '90d',
    step: 'week',
  },
};
