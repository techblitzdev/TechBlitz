import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';

const RoadmapsCard = dynamic(() => import('@/components/app/roadmaps/[uid]/roadmaps-card'), {
  ssr: false,
  loading: () => (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <RoadmapsCardSkeleton key={index} />
      ))}
    </>
  ),
});

import RoadmapOnboarding from '@/components/app/roadmaps/empty/onboarding';
import Hero from '@/components/shared/hero';

const CreateRoadmapButton = dynamic(
  () => import('@/components/app/roadmaps/create-roadmap-button'),
  {
    ssr: false,
  }
);

import { fetchUserRoadmaps } from '@/utils/data/roadmap/fetch-user-roadmaps';
import { useUserServer } from '@/hooks/use-user-server';
import RoadmapsCardSkeleton from '@/components/app/roadmaps/[uid]/roadmaps-card-loading';
import UpgradeLayout from '@/components/app/shared/upgrade-layout';
import FeedbackButton from '@/components/app/shared/feedback/feedback-button';
import RoadmapIcon from '@/components/ui/icons/roadmap';

export default async function RoadmapPage() {
  // middleware should catch this, but just in case
  const user = await useUserServer();
  if (!user) return redirect('/login');
  if (user.userLevel === 'FREE') {
    return (
      <UpgradeLayout
        title="Personalized Coding Roadmaps"
        description="In order to create personalized coding roadmaps, you need to upgrade to Premium."
      />
    );
  }
  // fetch the user's roadmaps
  const userRoadmaps = await fetchUserRoadmaps(user.uid);

  // if we do not have any roadmaps, we render the 'onboarding'
  // component to guide the user on how to create their first roadmap
  if (!userRoadmaps.length) {
    return <RoadmapOnboarding />;
  }

  // order the roadmaps by the createdAt date
  userRoadmaps.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return (
    <>
      <Hero
        heading="Roadmaps"
        subheading="Here you can view all of your roadmaps and their progress, as well as create new ones."
      />
      <div className="flex flex-col lg:flex-row gap-16 mt-5 md:container">
        <div className="w-full lg:w-[65%] relative">
          {userRoadmaps.map((roadmap) => (
            <RoadmapsCard key={roadmap.uid} roadmap={roadmap} />
          ))}
        </div>

        {/** create new roadmap cta */}
        <aside className="order-first md:order-last w-full lg:w-[35%] relative">
          <div className="sticky top-10 space-y-10">
            <div className="bg-[#090909] flex flex-col gap-y-2 backdrop-blur-sm border border-black-50 p-4 rounded-lg h-fit">
              <div className="flex items-center space-x-2 text-white">
                <RoadmapIcon height="24" width="24" />
                <span>Enjoying Roadmaps?</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Our goal is to make learning to code as personalized as possible. If you have any
                feedback, please let us know and we will get back to you as soon as possible.
              </p>
              <FeedbackButton title="Roadmaps feedback" />
            </div>
            <CreateRoadmapButton />
          </div>
        </aside>
      </div>
    </>
  );
}
