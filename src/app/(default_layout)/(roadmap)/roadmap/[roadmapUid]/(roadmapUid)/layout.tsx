import { fetchNextPrevRoadmap } from '@/actions/roadmap/fetch-next-prev-roadmap';
import { fetchRoadmap } from '@/actions/roadmap/fetch-single-roadmap';
import BackToDashboard from '@/components/global/back-to-dashboard';
import QuestionNavigation from '@/components/global/navigation/question-navigation';
import RoadmapDropdown from '@/components/roadmaps/[uid]/dropdown';
import { Separator } from '@/components/ui/separator';
import { useUserServer } from '@/hooks/useUserServer';

export default async function RoadmapOverviewPage({
  children,
  params
}: Readonly<{ children: React.ReactNode; params: { roadmapUid: string } }>) {
  const { roadmapUid } = params;

  const user = await useUserServer();
  if (!user) return;

  // get the next and previous roadmaps
  const { prevRoadmapUid, nextRoadmapUid } = await fetchNextPrevRoadmap({
    roadmapUid,
    userUid: user.uid
  });

  // fetch the roadmap to display the title and description
  const roadmap = await fetchRoadmap({ roadmapUid, userUid: user.uid });

  return (
    <div className="text-white flex flex-col gap-y-4 relative h-full">
      <div className="flex items-center justify-between gap-4 container">
        <div className="flex items-center gap-x-5 py-2">
          {/** Previous question button */}
          <BackToDashboard href="/roadmaps" />
        </div>
        <div className="flex flex-col gap-y-1 text-center items-center">
          <h1 className="text-xl md:text-3xl font-satoshi font-semibold">
            {roadmap?.title}
          </h1>
          <p className="font-ubuntu text-xs text-gray-300 max-w-4xl">
            {roadmap?.description}
          </p>
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
      {children}
    </div>
  );
}
