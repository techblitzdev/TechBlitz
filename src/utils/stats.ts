import type { StatsSteps } from '@/types';

export const getRange = (from: StatsSteps) => {
  const toDate = new Date();
  let fromDate: Date;

  switch (from) {
    case '7d':
      fromDate = new Date(toDate);
      fromDate.setDate(toDate.getDate() - 7);
      break;
    case '30d':
      fromDate = new Date(toDate);
      fromDate.setDate(toDate.getDate() - 30);
      break;
    case '90d':
      fromDate = new Date(toDate);
      fromDate.setDate(toDate.getDate() - 90);
      break;
    default:
      throw new Error('Invalid date range');
  }

  return fromDate;
};
