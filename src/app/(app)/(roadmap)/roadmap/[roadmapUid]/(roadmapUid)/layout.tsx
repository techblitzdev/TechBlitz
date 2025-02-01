import RoadmapDropdown from "@/components/app/roadmaps/[uid]/dropdown";
import { Separator } from "@/components/ui/separator";
import { useUserServer } from "@/hooks/use-user-server";
import SidebarLayoutTrigger from "@/components/app/navigation/sidebar-layout-trigger";
import { fetchRoadmap } from "@/utils/data/roadmap/fetch-single-roadmap";
import { UserRoadmaps } from "@/types/Roadmap";

export default async function RoadmapOverviewPage({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { roadmapUid: string } }>) {
  const { roadmapUid } = params;

  const [user, roadmap] = await Promise.all([
    useUserServer(),
    fetchRoadmap({ roadmapUid }),
  ]);
  if (!user) return;

  return (
    <div className="text-white flex flex-col gap-y-2 relative h-full">
      <div className="flex items-center justify-between gap-4 px-6">
        <div className="flex-1 relative h-7">
          <SidebarLayoutTrigger />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-x-5"></div>
          {roadmap && <RoadmapDropdown roadmap={roadmap as UserRoadmaps} />}
        </div>
      </div>
      <Separator className="bg-black-50" />
      <div className="container">{children}</div>
    </div>
  );
}
