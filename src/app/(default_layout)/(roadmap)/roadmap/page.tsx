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
    <div>
      <h1>Roadmap page</h1>
      <Link href={`/roadmap/${userRoadmaps[0].uid}/onboarding/1`}>
        Current roadmap
      </Link>
    </div>
  );
}
