import { BentoGrid, BentoGridItem } from '../ui/bento-grid';

import { getTodaysQuestion } from '@/actions/questions/get-today';
import { getUserDailyStats } from '@/actions/user/authed/get-daily-streak';

import TodaysLeaderboardBentoBox from '@/components/leaderboard/bento-box';
import { getUserFromSession } from '@/actions/user/authed/get-user';
import AllQuestionsDashboardBentoBox from '../dashboard/all-questions-bento-box';
import TodaysQuestionBentoBox from './todays-question-bento-box';
import YesterdaysQuestionBentoBox from './yesterdays-question-bento-box';
import { getYesterdaysQuestion } from '@/actions/questions/get-yesterdays-question';
import ProgressBentoBox from './progression-bento-box';
import StreakBentoBox from './streak-bento-box';

export default async function DashboardBentoGrid() {
  const todaysQuestion = await getTodaysQuestion();
  const yesterdaysQuestion = await getYesterdaysQuestion();
  const { data: user } = await getUserFromSession();

  if (!user || !user.user?.id) return;

  const userStreak = await getUserDailyStats(user?.user?.id);

  const items = [
    {
      header: <TodaysQuestionBentoBox question={todaysQuestion} />,
      className: 'h-full text-white justify-center',
      // conditionally render the href based on whether there is a question
      href: todaysQuestion?.uid ? `/question/${todaysQuestion?.uid}` : null,
      padded: false,
      gradientBg: true
    },
    {
      header: <YesterdaysQuestionBentoBox question={yesterdaysQuestion} />,
      className: 'h-full text-white justify-center',
      // conditionally render the href based on whether there is a question
      href: yesterdaysQuestion?.uid
        ? `/question/${yesterdaysQuestion?.uid}`
        : null,
      padded: false,
      gradientBg: true
    },
    {
      header: <AllQuestionsDashboardBentoBox />,
      className: 'md:col-span-2 text-white',
      href: '/questions/all',
      padded: false
    },
    {
      header: <TodaysLeaderboardBentoBox todaysQuestion={todaysQuestion} />,
      className: 'md:col-span-1 md:row-span-2 text-white h-full',
      href: '/leaderboard',
      padded: false
    },
    {
      header: <ProgressBentoBox />,
      className: 'md:col-span-2 text-white',
      padded: false
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
      padded: false
    }
  ];

  // remove any hrefs that are null
  items.forEach((item) => {
    if (!item.href || item.href === null) delete item.href;
  });

  return (
    <BentoGrid className="grid-rows-[auto_auto_auto] md:grid-rows-[repeat(2,minmax(0,1fr))] h-full">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          header={item.header}
          className={item.className}
          href={item?.href}
          padded={item.padded}
          gradientBg={item.gradientBg}
        />
      ))}
    </BentoGrid>
  );
}
