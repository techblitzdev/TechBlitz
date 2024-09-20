import { cn } from '@/lib/utils';
import React from 'react';
import { BentoGrid, BentoGridItem } from '../ui/bento-grid';
import { Skeleton } from '../ui/skeleton';
import TodayTaskList from './today-task-list';

export default function DashboardBentoGrid() {
  const items = [
    {
      title: 'Today’s Question!',
      description:
        'Today’s question is about the importance of learning new things.',
      header: <TodayTaskList />,
      className: 'md:col-span-2 text-white',
      href: '/todays-question',
    },
    {
      title: 'X days streak!',
      description: 'Keep up the good work!',
      header: <Skeleton />,
      className: 'md:col-span-1 text-white',
    },
    {
      title: 'Previous Task',
      description: 'Want to see the previous tasks?',
      header: <Skeleton />,
      className: 'md:col-span-1 text-white',
    },
    {
      title: "Today's Task's fasted times!",
      description: 'Can you beat the fastest time?',
      header: <Skeleton />,
      className: 'md:col-span-2 text-white',
    },
  ];

  return (
    <BentoGrid className="">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          href={item.href}
        />
      ))}
    </BentoGrid>
  );
}
