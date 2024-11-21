import { fetchUserRoadmaps } from '@/actions/roadmap/fetch-user-roadmaps';
import RoadmapOnboarding from '@/components/roadmaps/empty/onboarding';
import { useUserServer } from '@/hooks/useUserServer';
import Link from 'next/link';

export default async function RoadmapPage() {
  const user = await useUserServer();
  if (!user) return null;

  // fetch the user's roadmaps
  const userRoadmaps = await fetchUserRoadmaps(user.uid);

  // if we do not have any roadmaps, we render the 'onboarding'
  // component to guide the user on how to create their first roadmap
  if (!userRoadmaps.length) {
    return <RoadmapOnboarding />;
  }

  // determine the href for the roadmap depending on status
  // if the roadmap is creating, we redirect the user to the current question
  // otherwise, the roadmap/roadmapUid page
  const roadmapsMap = userRoadmaps.map((roadmap) => {
    return {
      roadmap: roadmap,
      href:
        roadmap.status === 'ACTIVE'
          ? `/roadmap/${roadmap.uid}`
          : `/roadmap/${roadmap.uid}/onboarding/${roadmap.currentQuestionIndex}`,
    };
  });

  return (
    <div className="space-y-4">
      <h1>Roadmap page</h1>
      {roadmapsMap.map(({ roadmap, href }) => (
        <div key={roadmap.uid}>
          <Link href={href}>{roadmap.status}</Link>
        </div>
      ))}
    </div>
  );
}
