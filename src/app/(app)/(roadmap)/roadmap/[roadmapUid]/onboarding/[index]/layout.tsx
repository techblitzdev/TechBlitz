import BackToDashboard from '@/components/ui/back-to-dashboard';
import OnboardingProgressBar from '@/components/app/roadmaps/onboarding/onboarding-progress-bar';
import { Separator } from '@/components/ui/separator';
import { useUserServer } from '@/hooks/use-user-server';
import SidebarLayoutTrigger from '@/components/app/navigation/sidebar-layout-trigger';

export default async function RoadmapUidLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { index: number; roadmapUid: string };
}>) {
  const { index, roadmapUid } = params;

  const user = await useUserServer();
  if (!user) return;

  return (
    <>
      <div className="flex items-center justify-between px-6">
        <div className="flex items-center gap-x-5 py-2">
          <SidebarLayoutTrigger />
          {/** Previous question button */}
          <BackToDashboard href="/roadmaps" backTo="roadmaps" />
        </div>
        <OnboardingProgressBar currentStep={index} />
        <div className="flex items-center gap-x-5"></div>
      </div>
      <Separator className="bg-black-50 mt-5" />
      {children}
    </>
  );
}
