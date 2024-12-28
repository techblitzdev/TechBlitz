import { Suspense } from 'react';
import { redirect } from 'next/navigation';

import StatsRangePicker from '@/components/app/statistics/range-picker';
import QuestionChart from '@/components/app/statistics/total-question-chart';
import TotalStatsCard from '@/components/app/statistics/total-stats-card';
import LoadingSpinner from '@/components/ui/loading';

import { useUserServer } from '@/hooks/useUserServer';
import { StatsSteps } from '@/types/Stats';

import { STATISTICS } from '@/utils/constants/statistics-filters';
import { formatSeconds } from '@/utils/time';

import { getData } from '@/actions/statistics/get-stats-chart-data';
import Hero from '@/components/global/hero';
import SuggestedQuestions from '@/components/app/statistics/suggested-questions';
import StatisticsReview from '@/components/app/statistics/statistics-review';
import { Button } from '@/components/ui/button';
import { EllipsisVertical, FileText } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/utils/cn';

// Add metadata for better SEO and caching
export const metadata = {
  title: 'Statistics | techblitz',
  description: 'View your coding statistics and progress',
};

// Add revalidate to cache page for 1 hour
export const revalidate = 3600;

export default async function StatisticsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await useUserServer();
  if (!user) {
    redirect('/login');
  }

  // Get and validate range param
  const range = (searchParams.range as StatsSteps) || '7d';
  const { step } = STATISTICS[range];

  // Prefetch data
  const { stats, highestScoringTag, totalQuestions, totalTimeTaken } =
    await getData({
      userUid: user.uid,
      from: range,
      to: new Date().toISOString(),
      step,
    });

  return (
    <div>
      <div className="pt-7 pb-5 flex flex-col gap-3 md:flex-row w-full justify-between md:items-center">
        <Hero
          heading="Statistics"
          container={false}
          subheading="A detailed overview of your coding journey."
        />
        <div className="flex gap-3">
          <StatsRangePicker selectedRange={STATISTICS[range].label} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="px-2" variant="default" padding="md" size="sm">
                <EllipsisVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-black-75 border border-black-50 text-white hover:text-white"
            >
              <DropdownMenuItem
                className={cn(
                  'hover:cursor-pointer flex items-center gap-x-2',
                  user?.userLevel !== 'PREMIUM' &&
                    'opacity-50 hover:cursor-not-allowed'
                )}
              >
                <FileText className="size-3.5" />
                Generate Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-y-4 gap-x-8">
        <Suspense fallback={<LoadingSpinner />}>
          <TotalStatsCard
            className="-left-3 relative"
            header={Number(totalQuestions)}
            description="Total Questions Answered"
          />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <TotalStatsCard
            header={formatSeconds(totalTimeTaken || 0, true)}
            description="Total Time Answering"
          />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <TotalStatsCard
            header={highestScoringTag?.tag || '-'}
            description={`Highest Scoring Tag (${highestScoringTag?.count || 0})`}
          />
        </Suspense>
        <div className="max-h-[28rem] col-span-12 mb-4">
          {stats && <QuestionChart questionData={stats} />}
        </div>
        {/** suggested q's and analysis blocks */}
        <SuggestedQuestions />
        <StatisticsReview />
      </div>
    </div>
  );
}
