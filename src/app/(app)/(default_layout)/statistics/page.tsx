import StatsRangePicker from '@/components/app/statistics/range-picker';
import QuestionChart from '@/components/app/statistics/total-question-chart';

import { useUserServer } from '@/hooks/use-user-server';
import { StatsSteps } from '@/types/Stats';

import { STATISTICS } from '@/utils/constants';

import { getData } from '@/utils/data/statistics/get-stats-chart-data';
import Hero from '@/components/shared/hero';
import SuggestedQuestions from '@/components/app/statistics/suggested-questions';
import StatisticsReport from '@/components/app/statistics/statistics-report';
import StatisticsOverviewMenu from '@/components/app/statistics/statistics-overview-menu';
import QuestionTracker from '@/components/app/statistics/question-tracker';

export const metadata = {
  title: 'Statistics | techblitz',
  description: 'View your coding statistics and progress',
};

export default async function StatisticsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // ensure only premiums users can access this page
  const user = await useUserServer();
  if (!user) {
    return null;
  }

  // Get and validate range param
  const range = (searchParams.range as StatsSteps) || '7d';
  const { step } = STATISTICS[range];

  // Prefetch data
  const { stats } = await getData({
    userUid: user.uid,
    from: range,
    to: new Date().toISOString(),
    step,
  });

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row w-full justify-between md:items-center">
        <Hero
          heading="Statistics"
          container={false}
          subheading="An overview of your coding journey on techblitz."
        />
        <div className="flex gap-3">
          <StatsRangePicker selectedRange={STATISTICS[range].label} />
          <StatisticsOverviewMenu user={user} />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-y-4 gap-x-8 mt-8 md:mt-0">
        <div className="max-h-[28rem] col-span-12 mb-4">
          {stats && <QuestionChart questionData={stats} step={step} />}
        </div>
        <QuestionTracker />
        {/** suggested q's and analysis blocks */}
        <SuggestedQuestions />
        <StatisticsReport />
      </div>
    </div>
  );
}
