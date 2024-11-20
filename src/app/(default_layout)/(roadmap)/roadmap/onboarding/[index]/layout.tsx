import { fetchRoadmapQuestionViaOrder } from '@/actions/roadmap/questions/fetch-roadmap-question-via-order';
import BackToDashboard from '@/components/global/back-to-dashboard';
import CurrentStreak from '@/components/global/current-streak';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useUserServer } from '@/hooks/useUserServer';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Flame,
} from 'lucide-react';
import Link from 'next/link';

export default async function RoadmapUidLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { index: number } }>) {
  const { index } = params;

  const user = await useUserServer();
  if (!user) return;

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-5 py-2">
          {/** Previous question button */}
          <BackToDashboard />
        </div>
        <div className="flex items-center gap-x-5">
          <CurrentStreak />
          <div className="flex gap-x-2 items-center">
            <TooltipProvider delayDuration={0} skipDelayDuration={100}>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    href={`/roadmap/onboarding/${index + 1}`}
                    className="bg-black-100 border border-black-50 p-2 rounded-md relative group duration-200 size-8 flex items-center justify-center"
                  >
                    <ChevronRight className="size-4 opacity-100 group-hover:opacity-0 absolute duration-100" />
                    <ArrowRight className="size-4 opacity-0 group-hover:opacity-100 absolute duration-100" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom">Next question</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      <Separator className="bg-black-50" />
      {children}
    </>
  );
}
