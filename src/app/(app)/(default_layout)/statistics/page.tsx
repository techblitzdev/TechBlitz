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
    title: 'Statistics | techblitz',
    description: 'View your coding statistics and progress',
    image: {
      text: 'Statistics | techblitz',
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

  // Prefetch data with includeDifficultyData flag
  const { stats } = await getData({
    userUid: user.uid,
    from: range,
    to: new Date().toISOString(),
    step,
    includeDifficultyData: true, // Make sure to include difficulty data
  });

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row w-full justify-between md:items-center">
        <Hero
          heading={`${getUserDisplayName(user)}'s Statistics`}
          container={false}
          subheading="Dive into your current coding journey, track your progress, and gain insight on how to improve your skills."
        />
        {stats && (
          <DifficultyRadialChart questionData={stats} step={step} backgroundColor="bg-card-dark" />
        )}
      </div>

      <div className="grid grid-cols-12 gap-y-4 gap-x-8 mt-8 md:mt-0">
        {/* Radial Difficulty Chart */}
        <div className="col-span-12 lg:col-span-6 mb-4"></div>
      </div>
    </div>
  );
}
