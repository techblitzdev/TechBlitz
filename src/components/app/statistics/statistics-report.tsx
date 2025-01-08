import { generateStatisticsReport } from '@/actions/ai/reports/generate-report';
import { getUserReports } from '@/actions/statistics/reports/get-reports';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useUserServer } from '@/hooks/use-user-server';
import { cn } from '@/lib/utils';
import { ArrowRight, ChevronRight, LockIcon } from 'lucide-react';
import Link from 'next/link';

export default async function StatisticsReport() {
  const user = await useUserServer();

  // get all reports
  const reports = await getUserReports();

  return (
    <section
      className="
            col-span-full lg:col-span-6 border border-black-50 rounded-lg flex flex-col overflow-hidden
        "
    >
      <div className="flex flex-col gap-2.5 px-3 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-onest">Statistics Review</h2>
          <Button
            variant="secondary"
            className="flex items-center gap-x-2 text-sm"
            href="/statistics/reports"
            disabled={reports.length === 0 || user?.userLevel === 'FREE'}
          >
            Reports overview
            <ChevronRight className="size-4" />
          </Button>
        </div>
        <p className="text-sm text-gray-400">
          A personalized, in-depth analysis of your current coding ability.
        </p>
      </div>
      <Separator className="bg-black-50" />
      <div className="flex flex-col divide-y-[1px] divide-black-50">
        {reports.map((report, index) => (
          <Link
            key={report.uid}
            className={cn(
              'p-3 truncate w-full flex justify-between items-center group',
              index % 2 === 0
                ? 'bg-[#000] hover:bg-black-100'
                : 'bg-black hover:bg-black-75'
            )}
            href={`/statistics/reports/${report.uid}`}
          >
            <p className="text-sm font-satoshi line-clamp-1">
              Report for {report.createdAt.toLocaleDateString()}
            </p>
            <ArrowRight className="size-3 mr-1 group-hover:mr-0 duration-300 flex-shrink-0" />
          </Link>
        ))}
      </div>
      {reports.length === 0 && (
        <form
          className="px-3 py-4 h-full flex items-center justify-center"
          action={generateStatisticsReport}
        >
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  className="flex items-center gap-x-2"
                  disabled={user?.userLevel === 'FREE'}
                >
                  Generate Report
                  {user?.userLevel === 'FREE' && (
                    <LockIcon className="size-4" />
                  )}
                </Button>
              </TooltipTrigger>
              {user?.userLevel === 'FREE' && (
                <TooltipContent>
                  <p>You need to be a premium user to generate a report.</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </form>
      )}
    </section>
  );
}
