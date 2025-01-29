import BackToDashboard from '@/components/ui/back-to-dashboard';
import OnboardingProgressBar from '@/components/app/roadmaps/onboarding/onboarding-progress-bar';
import { Separator } from '@/components/ui/separator';
import { useUserServer } from '@/hooks/use-user-server';
import SidebarLayoutTrigger from '@/components/app/navigation/sidebar-layout-trigger';
import { RoadmapOnboardingContextProvider } from '@/components/app/roadmaps/onboarding/roadmap-onboarding-context';
import { fetchRoadmapQuestionViaOrder } from '@/utils/data/roadmap/questions/fetch-roadmap-question-via-order';

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
        <div className="flex items-center gap-x-5 py-2">
          <div className="flex-1">
            <SidebarLayoutTrigger />
          </div>
          {/** Previous question button */}
          <BackToDashboard href="/roadmaps" backTo="roadmaps" />
        </div>
        <OnboardingProgressBar currentStep={index} />
        <div className="flex items-center gap-x-5"></div>
      </div>
      <Separator className="bg-black-50 mt-2" />
      {children}
    </RoadmapOnboardingContextProvider>
  );
}
