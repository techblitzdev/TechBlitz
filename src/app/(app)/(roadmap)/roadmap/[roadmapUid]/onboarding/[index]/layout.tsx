import BackToDashboard from '@/components/ui/back-to-dashboard';
import OnboardingProgressBar from '@/components/app/roadmaps/onboarding/onboarding-progress-bar';
import { Separator } from '@/components/ui/separator';
import { useUserServer } from '@/hooks/use-user-server';
import SidebarLayoutTrigger from '@/components/app/navigation/sidebar-layout-trigger';
import { RoadmapOnboardingContextProvider } from '@/components/app/roadmaps/onboarding/roadmap-onboarding-context';
import { fetchRoadmapQuestionViaOrder } from '@/utils/data/roadmap/questions/fetch-roadmap-question-via-order';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default async function RoadmapUidLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { roadmapUid: string; index: number };
}>) {
  const { index, roadmapUid } = params;

  const user = await useUserServer();
  if (!user) return;

  // get the onboarding question
  const question = await fetchRoadmapQuestionViaOrder(index);
  // if no question no party
  if (!question) return;

  return (
    <RoadmapOnboardingContextProvider
      user={user}
      roadmapUid={roadmapUid}
      question={question}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center py-2 px-3">
          <SidebarLayoutTrigger />
          {/** Previous question button */}
          <div className="flex items-center gap-x-2">
            <TooltipProvider delayDuration={0} skipDelayDuration={100}>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="default"
                    className="z-30 flex items-center gap-x-2 mr-2"
                    href="/roadmaps"
                  >
                    <ArrowLeft className="size-4" />
                    <span className="text-sm hidden sm:block">Back</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  Back to Roadmap overview
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <OnboardingProgressBar currentStep={index} />
        <div className="flex items-center gap-x-5"></div>
      </div>
      <Separator className="bg-black-50 mt-2" />
      {children}
    </RoadmapOnboardingContextProvider>
  );
}
