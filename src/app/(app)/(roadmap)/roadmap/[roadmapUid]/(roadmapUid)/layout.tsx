import { fetchNextPrevRoadmap } from '@/actions/roadmap/fetch-next-prev-roadmap';
import BackToDashboard from '@/components/ui/back-to-dashboard';
import QuestionNavigation from '@/components/global/navigation/question-navigation';
import RoadmapDropdown from '@/components/app/roadmaps/[uid]/dropdown';
import { Separator } from '@/components/ui/separator';
import { useUserServer } from '@/hooks/use-user-server';
import SidebarLayoutTrigger from '@/components/global/navigation/sidebar-layout-trigger';

export default async function RoadmapOverviewPage({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { roadmapUid: string } }>) {
  const { roadmapUid } = params;

  const user = await useUserServer();
  if (!user) return;

  // get the next and previous roadmaps
  const { prevRoadmapUid, nextRoadmapUid } = await fetchNextPrevRoadmap({
    roadmapUid,
    userUid: user.uid,
  });

  return (
    <div className="text-white flex flex-col gap-y-4 relative h-full">
      <div className="flex items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-x-5 py-2">
          <SidebarLayoutTrigger />
          {/** Previous question button */}
          <BackToDashboard href="/roadmaps" />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-x-5">
            <QuestionNavigation
              nextQuestion={
                nextRoadmapUid ? `/roadmap/${nextRoadmapUid}` : null
              }
              previousQuestion={
                prevRoadmapUid ? `/roadmap/${prevRoadmapUid}` : null
              }
              navigationType="roadmap"
            />
          </div>
          <RoadmapDropdown roadmapUid={roadmapUid} />
        </div>
      </div>
      <Separator className="bg-black-50" />
      <div className="container">{children}</div>
    </div>
  );
}
