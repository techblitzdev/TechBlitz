import dynamic from 'next/dynamic';

import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';

const AllQuestionsDashboardBentoBox = dynamic(
  () => import('@/components/app/dashboard/all-questions-bento-box'),
  { ssr: false }
);

import TodaysQuestionBentoBox from '@/components/app/dashboard/todays-question-bento-box';

import ProgressBentoBox from '@/components/app/dashboard/progression-bento-box';
import StreakBentoBox from '@/components/app/dashboard/streak-bento-box';

export default async function DashboardBentoGrid() {
  const items = [
    {
      header: <TodaysQuestionBentoBox />,
      className:
        'h-full text-white justify-center min-h-fit col-span-2 lg:col-span-1',
      padded: false,
      gradientBg: true,
    },
    {
      header: <AllQuestionsDashboardBentoBox />,
      className: 'col-span-2 text-white',
      href: '/questions',
      padded: false,
    },
    {
      header: <ProgressBentoBox />,
      className: 'col-span-2 text-white min-h-[25rem]',
      padded: false,
    },
    {
      header: <StreakBentoBox />,
      className:
        'h-full text-white justify-center min-h-[18rem] col-span-2 lg:col-span-1',
      href: '/statistics',
      padded: false,
      gradientBg: true,
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
