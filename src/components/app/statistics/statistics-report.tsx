import { generateStatisticsReport } from '@/actions/ai/reports/generate-report';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useUserServer } from '@/hooks/useUserServer';
import { LockIcon } from 'lucide-react';

export default async function StatisticsReport() {
  const user = await useUserServer();

  return (
    <section
      className="
            col-span-full lg:col-span-6 border border-black-50 rounded-lg flex flex-col overflow-hidden
        "
    >
      <div className="flex flex-col gap-2.5 px-3 py-4">
        <h2 className="text-2xl font-onest">Statistics Review</h2>
        <p className="text-sm text-gray-400">
          A personalized, in-depth analysis of your current coding ability.
        </p>
      </div>
      <Separator className="bg-black-50" />
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
                {user?.userLevel === 'FREE' && <LockIcon className="size-4" />}
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
    </section>
  );
}
