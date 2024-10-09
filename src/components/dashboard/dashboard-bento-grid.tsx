import { cn } from '@/lib/utils';
import React from 'react';
import { BentoGrid, BentoGridItem } from '../ui/bento-grid';
import { Skeleton } from '../ui/skeleton';
import { DailyStreakChart } from './daily-streak-chart';

import { DAILY_STREAK } from '@/utils/constants/daily-streak';

import { getTodaysQuestion } from '@/actions/questions/get-today';
import { getUserDailyStats } from '@/actions/user/get-daily-streak';

import { createClient as createServerClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function DashboardBentoGrid() {
  const todaysQuestion = await getTodaysQuestion();
  const cookieStore = cookies();
  const supabase = createServerClient(cookieStore);

  const { data: user } = await supabase?.auth?.getUser();

  if (!user || !user.user?.id) return;

  const userStreak = await getUserDailyStats(user?.user?.id);

  const items = [
    {
      title: 'Today’s Question!',
      description: 'Today’s question is about something.',
      header: <Skeleton />,
      className: 'md:col-span-2 text-white',
      href: `/question/${todaysQuestion?.uid}`,
    },
    {
      title: `${userStreak?.totalDailyStreak} day streak!`,
      description: DAILY_STREAK,
      header: userStreak && (
        <div className="flex size-full items-center justify-center h-[180px]">
          <DailyStreakChart userStreakData={userStreak} />
        </div>
      ),
      className: 'md:col-span-1 text-white',
    },
    {
      title: 'Previous Questions',
      description: 'Can you beat your previous score?',
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
