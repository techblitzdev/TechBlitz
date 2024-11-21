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

  return (
    <div className="space-y-4">
      <h1>Roadmap page</h1>
      {userRoadmaps.map((roadmap) => (
        <div key={roadmap.uid}>
          <Link
            href={`/roadmap/${roadmap.uid}/onboarding/${roadmap.currentQuestionIndex}`}
          >
            {roadmap.status}
          </Link>
        </div>
      ))}
    </div>
  );
}
