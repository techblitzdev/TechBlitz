import { redirect } from 'next/navigation';

import StatsRangePicker from '@/components/app/statistics/range-picker';
import QuestionChart from '@/components/app/statistics/total-question-chart';

import { useUserServer } from '@/hooks/useUserServer';
import { StatsSteps } from '@/types/Stats';

import { STATISTICS } from '@/utils/constants/statistics-filters';

import { getData } from '@/actions/statistics/get-stats-chart-data';
import Hero from '@/components/global/hero';
import SuggestedQuestions from '@/components/app/statistics/suggested-questions';
import StatisticsReport from '@/components/app/statistics/statistics-report';
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
                  user?.userLevel === 'PREMIUM' &&
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

      <div className="grid grid-cols-12 gap-y-4 gap-x-8 mt-8 md:mt-0">
        <div className="max-h-[28rem] col-span-12 mb-4">
          {stats && <QuestionChart questionData={stats} />}
        </div>
        {/** suggested q's and analysis blocks */}
        <SuggestedQuestions />
        <StatisticsReport />
      </div>
    </div>
  );
}
