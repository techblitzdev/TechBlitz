import { BentoGrid, BentoGridItem } from '../ui/bento-grid';
import { Skeleton } from '../ui/skeleton';
import { DailyStreakChart } from './daily-streak-chart';
import { ArrowRight } from 'lucide-react';

import { DAILY_STREAK } from '@/utils/constants/daily-streak';

import { getTodaysQuestion } from '@/actions/questions/get-today';
import { getUserDailyStats } from '@/actions/user/get-daily-streak';

import TodaysLeaderboardBentoBox from '@/components/leaderboard/bento-box';
import { getUserFromSession } from '@/actions/user/get-user';
import { Button } from '../ui/button';
import AllQuestionsDashboardBentoBox from '../dashboard/all-questions-bento-box';
import TodaysQuestionBentoBox from './todays-question-bento-box';
import YesterdaysQuestionBentoBox from './yesterdays-question-bento-box';
import { getYesterdaysQuestion } from '@/actions/questions/get-yesterdays-question';
import ProgressBentoBox from './progression-bento-box';
import StreakBentoBox from './streak-bento-box';
import NoDailyQuestion from '../global/errors/no-daily-question';

export default async function DashboardBentoGrid() {
  const todaysQuestion = await getTodaysQuestion();
  const yesterdaysQuestion = await getYesterdaysQuestion();
  const { data: user } = await getUserFromSession();

  if (!user || !user.user?.id) return;

  const userStreak = await getUserDailyStats(user?.user?.id);

  const items = [
    {
      header: todaysQuestion ? (
        <TodaysQuestionBentoBox question={todaysQuestion} />
      ) : (
        <div className="p-4">
          <NoDailyQuestion variant="accent" />
        </div>
      ),
      className: 'h-full text-white',
      href: `/question/${todaysQuestion?.uid}`,
      padded: false,
    },
    {
      header: yesterdaysQuestion ? (
        <YesterdaysQuestionBentoBox question={yesterdaysQuestion} />
      ) : (
        <div className="p-4">
          <NoDailyQuestion variant="accent" />
        </div>
      ),
      className: 'h-full text-white',
      href: `/question/${yesterdaysQuestion?.uid}`,
      padded: false,
    },
    {
      header: <AllQuestionsDashboardBentoBox />,
      className: 'md:col-span-2 text-white',
      href: '/questions',
      padded: false,
    },
    {
      title: <div>Today's Leaderboard</div>,
      description: (
        <Button variant="accent" className="flex gap-x-1 items-center">
          View the full list <ArrowRight className="size-3" />
        </Button>
      ),
      header: <TodaysLeaderboardBentoBox todaysQuestion={todaysQuestion} />,
      className: 'md:col-span-1 md:row-span-2 text-white h-full',
      href: '/leaderboard/today',
      padded: true,
    },
    {
      header: <ProgressBentoBox />,
      className: 'md:col-span-2 text-white',
      padded: false,
    },
    {
      //title: `${userStreak?.totalDailyStreak} day streak!`,
      //description: DAILY_STREAK,
      header: userStreak && (
        // <div className="flex size-full items-center justify-center h-[180px]">
        //   <DailyStreakChart userStreakData={userStreak} />
        // </div>
        <StreakBentoBox />
      ),
      className: 'md:col-span-1 text-white',
      padded: false,
    },
  ];

  return (
    <BentoGrid className="grid-rows-[auto_auto_auto] md:grid-rows-[repeat(2,minmax(0,1fr))] h-full">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          href={item.href}
          padded={item.padded}
        />
      ))}
    </BentoGrid>
  );
}
