'use client';

import { Tracker } from '@/components/ui/tracker';
import { cn } from '@/lib/utils';
import type { StatsSteps } from '@/types';

interface QuestionTrackerProps {
  stats: {
    [key: string]: {
      totalQuestions: number;
      tagCounts: Record<string, number>;
      tags: string[];
    };
  };
  step: 'month' | 'week' | 'day';
  range: StatsSteps;
  className?: string;
}

export default function QuestionTracker({ stats, step, range, className }: QuestionTrackerProps) {
  // Transform stats data into tracker format
  const data = Object.entries(stats).map(([date, dayStats]) => {
    const { totalQuestions } = dayStats;

    // Determine color based on questions completed
    let color = '';
    if (totalQuestions === 0) {
      color = 'bg-red-600';
    } else if (totalQuestions >= 1) {
      color = 'bg-emerald-600';
    } else {
      color = 'bg-red-600';
    }

    // Format date for tooltip based on step
    const dateObj = new Date(date.split(',')[0]);
    let formattedDate = '';

    switch (step) {
      case 'month':
        formattedDate = dateObj.toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        });
        break;
      case 'week':
        formattedDate = `Week of ${dateObj.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })}`;
        break;
      case 'day':
        formattedDate = dateObj.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        });
        break;
    }

    return {
      color,
      tooltip: `${formattedDate}: ${totalQuestions} ${
        totalQuestions === 1 ? 'question' : 'questions'
      }`,
    };
  });

  // Sort by date ascending
  const sortedData = data.sort((a, b) => {
    const dateA = a.tooltip.includes('Week of')
      ? new Date(a.tooltip.split('Week of ')[1].split(':')[0])
      : new Date(a.tooltip.split(':')[0]);
    const dateB = b.tooltip.includes('Week of')
      ? new Date(b.tooltip.split('Week of ')[1].split(':')[0])
      : new Date(b.tooltip.split(':')[0]);
    return dateA.getTime() - dateB.getTime();
  });

  const rangeLabel = range === '7d' ? '7 days' : range === '30d' ? '30 days' : '3 months';

  return (
    <div className={cn('col-span-12 border border-black-50 rounded-lg p-6', className)}>
      <div className="flex flex-col gap-y-4">
        <h3 className="text-lg font-medium">Last {rangeLabel} activity</h3>
        <div>
          <Tracker className="hidden w-full lg:flex" data={sortedData} />
          <Tracker className="hidden w-full sm:flex lg:hidden" data={sortedData.slice(0, 60)} />
          <Tracker className="flex w-full sm:hidden" data={sortedData.slice(0, 30)} />
        </div>
      </div>
    </div>
  );
}
