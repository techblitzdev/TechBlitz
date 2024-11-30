import { createOrFetchUserRoadmap } from '@/actions/roadmap/create-or-fetch-user-roadmap';
import { fetchUserRoadmaps } from '@/actions/roadmap/fetch-user-roadmaps';
import RoadmapOnboarding from '@/components/roadmaps/empty/onboarding';
import { Button } from '@/components/ui/button';
import { useUserServer } from '@/hooks/useUserServer';
import { redirect } from 'next/navigation';
import PostHogClient from '../../../posthog';
import RoadmapsCard from '@/components/roadmaps/[uid]/roadmaps-card';
import CreateRoadmapButton from '@/components/roadmaps/create-roadmap-button';

export default async function RoadmapPage() {
  const user = await useUserServer();
  if (!user) return null;

  const posthog = PostHogClient();
  await posthog.getAllFlags('user_distinct_id');
  await posthog.shutdown();

  // fetch the user's roadmaps
  const userRoadmaps = await fetchUserRoadmaps(user.uid);

  // if we do not have any roadmaps, we render the 'onboarding'
  // component to guide the user on how to create their first roadmap
  if (!userRoadmaps.length) {
    return <RoadmapOnboarding />;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-10 mt-5 container">
      <div className="w-full lg:w-1/2 relative">
        {userRoadmaps.map((roadmap) => (
          <RoadmapsCard
            key={roadmap.uid}
            // @ts-ignore
            roadmap={roadmap}
          />
        ))}
      </div>

      {/** create new roadmap cta */}
      <aside className="w-full lg:w-1/2 relative">
        <div className="sticky top-10 space-y-10 w-1/2">
          <CreateRoadmapButton userId={user.uid} />
        </div>
      </aside>
    </div>
  );
}
