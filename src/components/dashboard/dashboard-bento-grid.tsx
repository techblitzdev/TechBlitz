import { cn } from '@/lib/utils';
import React from 'react';
import { BentoGrid, BentoGridItem } from '../ui/bento-grid';
import { Skeleton } from '../ui/skeleton';
//import TodayTaskList from './today-task-list';
import { getTodaysQuestion } from '@/actions/questions/get-today';
import { DailyStreakChart } from './daily-streak-chart';

export default async function DashboardBentoGrid() {
  const todaysQuestion = await getTodaysQuestion();

  const items = [
    {
      title: 'Today’s Question!',
      description:
        'Today’s question is about the importance of learning new things.',
      header: <Skeleton />,
      className: 'md:col-span-2 text-white',
      href: `/question/${todaysQuestion?.uid}`,
    },
    {
      title: 'X days streak!',
      description: 'Keep up the good work!',
      header: (
        <div className="flex size-full items-center justify-center">
          <DailyStreakChart />
        </div>
      ),
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
