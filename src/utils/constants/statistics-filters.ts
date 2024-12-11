import { StatsConstants, StatsSteps } from '@/types/Stats';

export const STEPS = ['7d', '30d', '90d'] as const;

export const STATISTICS_STEPS = [
  {
    value: 'last-7-days',
    label: 'Last 7 days'
  },
  {
    value: 'last-30-days',
    label: 'Last 30 days'
  },
  {
    value: 'last-90-days',
    label: 'Last 90 days'
  }
];

export const STATISTICS: Record<StatsSteps, StatsConstants> = {
  '7d': {
    label: 'Last 7 days',
    value: '7d'
  },
  '30d': {
    label: 'Last 30 days',
    value: '30d'
  },
  '90d': {
    label: 'Last 90 days',
    value: '90d'
  }
};
