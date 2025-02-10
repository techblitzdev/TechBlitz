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
import ContinueJourney from '@/components/app/navigation/continue-journey-button';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

const roadmapHeroDescription = (
  <div className="flex flex-col gap-y-4 z-20 relative font-inter max-w-3xl">
    <p className="text-sm md:text-base text-gray-400">
      A personalized roadmap is a list of questions that are tailored to your learning style and
      goals. You can generate and manage your own personalized roadmaps.
    </p>
    <div className="flex flex-col gap-y-2">
      <p className="text-gray-400">Can't find what you're looking for?</p>
      <div className="flex items-center gap-x-2">
        <Button href="/roadmaps" variant="secondary">
          View official roadmaps
        </Button>
        <Suspense
          fallback={
            <Button variant="default" className="w-full">
              Your next recommended question
              <ArrowRightIcon className="w-4 h-4" />
            </Button>
          }
        >
          <ContinueJourney text="Your next question" variant="default" />
        </Suspense>
      </div>
    </div>
  </div>
);

const upgradeDescription = (
  <div className="flex flex-col gap-y-2">
    <p className="text-gray-400">
      Looking for a more personalized experience? Upgrade to a premium account to unlock
      personalized roadmaps.{' '}
      <Link href="https://dub.sh/upgrade-techblitz" className="text-accent underline">
        Learn more
      </Link>
    </p>
  </div>
);

export default async function RoadmapPage() {
  // middleware should catch this, but just in case
  const user = await useUserServer();
  if (user?.userLevel === 'FREE' || !user) {
    return <UpgradeLayout title="Personalized Coding Roadmaps" description={upgradeDescription} />;
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
      <Hero heading="Personalized Roadmaps" subheading={roadmapHeroDescription} />
      <div className="flex flex-col lg:flex-row gap-16 mt-5 md:container">
        <div className="w-full lg:w-[65%] relative">
          {userRoadmaps.map((roadmap) => (
            <RoadmapsCard key={roadmap.uid} roadmap={roadmap} />
          ))}
        </div>

        {/** create new roadmap cta */}
        <aside className="order-first md:order-last w-full lg:w-[35%] relative">
          <div className="sticky top-10 space-y-10">
            <CreateRoadmapButton />
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
          </div>
        </aside>
      </div>
    </>
  );
}
