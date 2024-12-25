import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';

import { getTodaysQuestion } from '@/actions/questions/get-today';

import TodaysLeaderboardBentoBox from '@/components/leaderboard/bento-box';
import AllQuestionsDashboardBentoBox from '@/components/dashboard/all-questions-bento-box';
import TodaysQuestionBentoBox from '@/components/dashboard/todays-question-bento-box';
import ProgressBentoBox from '@/components/dashboard/progression-bento-box';
import StreakBentoBox from '@/components/dashboard/streak-bento-box';

export default async function DashboardBentoGrid() {
  // run all the async functions in parallel
  const todaysQuestion = await getTodaysQuestion();

  const items = [
    {
      header: <TodaysQuestionBentoBox question={todaysQuestion} />,
      className: 'h-full text-white justify-center min-h-fit',
      // conditionally render the href based on whether there is a question
      href: todaysQuestion?.uid ? `/question/${todaysQuestion?.uid}` : null,
      padded: false,
      gradientBg: true,
    },
    {
      header: <StreakBentoBox />,
      className: 'h-full text-white justify-center min-h-fit',
      href: '/statistics',
      padded: false,
      gradientBg: true,
    },
    {
      header: <AllQuestionsDashboardBentoBox />,
      className: 'md:col-span-2 text-white',
      href: '/questions/all',
      padded: false,
    },
    {
      header: <TodaysLeaderboardBentoBox todaysQuestion={todaysQuestion} />,
      className: 'md:col-span-1 md:row-span-2 text-white h-full',
      padded: false,
    },
    {
      header: <ProgressBentoBox />,
      className: 'md:col-span-3 text-white min-h-[25rem]',
      padded: false,
    },
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
