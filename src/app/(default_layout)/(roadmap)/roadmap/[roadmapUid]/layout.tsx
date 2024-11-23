import { fetchNextPrevRoadmap } from '@/actions/roadmap/fetch-next-prev-roadmap';
import BackToDashboard from '@/components/global/back-to-dashboard';
import QuestionNavigation from '@/components/global/navigation/question-navigation';
import { Separator } from '@/components/ui/separator';
import { useUserServer } from '@/hooks/useUserServer';

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
      <div className="flex items-center justify-between container">
        <div className="flex items-center gap-x-5 py-2">
          {/** Previous question button */}
          <BackToDashboard />
        </div>
        <div className="flex flex-col text-center">
          <h1 className="text-xl md:text-3xl font-satoshi font-semibold">
            (Roadmap Title)
          </h1>
          <p className="font-ubuntu text-sm text-gray-300">
            (Roadmap Description)
          </p>
        </div>
        <div className="flex items-center gap-x-5">
          <QuestionNavigation
            nextQuestion={nextRoadmapUid ? `/roadmap/${nextRoadmapUid}` : null}
            previousQuestion={
              prevRoadmapUid ? `/roadmap/${prevRoadmapUid}` : null
            }
            navigationType="roadmap"
          />
        </div>
      </div>
      <Separator className="bg-black-50" />
      {children}
    </div>
  );
}
