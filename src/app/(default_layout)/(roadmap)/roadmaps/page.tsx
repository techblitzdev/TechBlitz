import { createOrFetchUserRoadmap } from '@/actions/roadmap/create-or-fetch-user-roadmap';
import { fetchUserRoadmaps } from '@/actions/roadmap/fetch-user-roadmaps';
import RoadmapOnboarding from '@/components/roadmaps/empty/onboarding';
import { Button } from '@/components/ui/button';
import { useUserServer } from '@/hooks/useUserServer';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import PostHogClient from '../../../posthog';

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

  const handleButtonClick = async (data: FormData) => {
    'use server';
    // create a new roadmap record for the user
    const roadmap = await createOrFetchUserRoadmap({
      userUid: user?.uid,
    });

    // redirect the user to the new page
    redirect(`/roadmap/${roadmap.uid}/onboarding/1`);
  };

  return (
    <div className="space-y-4 px-6">
      <h1>Roadmap page</h1>
      {roadmapsMap.map(({ roadmap, href }, index) => (
        <div key={roadmap.uid}>
          <Link href={href}>
            {index}. {roadmap.title}
          </Link>
        </div>
      ))}
      {/** create new roadmap cta */}
      <form action={handleButtonClick}>
        <Button>Create new roadmap</Button>
      </form>
    </div>
  );
}
