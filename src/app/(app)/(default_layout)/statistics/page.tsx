import StatsRangePicker from '@/components/app/statistics/range-picker';
import QuestionChart from '@/components/app/statistics/total-question-chart';
import DifficultyRadialChart from '@/components/app/statistics/difficulty-radial-chart';

import { useUserServer } from '@/hooks/use-user-server';
import { StatsSteps } from '@/types/Stats';

import { STATISTICS } from '@/utils/constants';

import { getData } from '@/utils/data/statistics/get-stats-chart-data';
import Hero from '@/components/shared/hero';
import SuggestedQuestions from '@/components/app/statistics/suggested-questions';
import StatisticsReport from '@/components/app/statistics/statistics-report';
import StatisticsOverviewMenu from '@/components/app/statistics/statistics-overview-menu';
import QuestionTracker from '@/components/app/statistics/question-tracker';
import { createMetadata } from '@/utils/seo';
import { getUserDisplayName } from '@/utils/user';

export async function generateMetadata() {
  return createMetadata({
    title: 'Statistics | TechBlitz',
    description:
      'Dive into your current coding journey, track your progress, and gain insight on how to improve your skills.',
    image: {
      text: 'Statistics | TechBlitz',
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: '/statistics',
  });
}

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

  // Prefetch data - get both time-grouped and overall stats
  const [timeGroupedStats, overallStats] = await Promise.all([
    getData({
      userUid: user.uid,
      from: range,
      to: new Date().toISOString(),
      step,
      includeDifficultyData: true,
    }),
    getData({
      userUid: user.uid,
      from: 'all',
      to: new Date().toISOString(),
      includeDifficultyData: true,
    }),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row w-full justify-between">
        <Hero
          heading={`${getUserDisplayName(user)}'s Statistics`}
          container={false}
          subheading="Dive into your coding journey, track your progress, and gain insight on how to improve your skills."
        />
        {overallStats.stats && <DifficultyRadialChart questionData={overallStats.stats} />}
      </div>
    </div>
  );
}
