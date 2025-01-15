import dynamic from 'next/dynamic';

import LeaderboardHero from '@/components/app/leaderboard/leaderboard-hero';
import { createMetadata } from '@/utils/seo';
import { getMostQuestionsAnswered } from '@/utils/data/leaderboard/get-most-questions-answered';
import { Suspense } from 'react';

const LeaderboardMostQuestionsAnswered = dynamic(
  () =>
    import('@/components/app/leaderboard/leaderboard-most-questions-answered')
);

export async function generateMetadata() {
  return createMetadata({
    title: 'Leaderboard | TechBlitz',
    description: 'See how you stack up against the rest of the community.',
    canonicalUrl: '/leaderboard',
    image: {
      text: 'Leaderboard | TechBlitz',
      bgColor: '#000000',
      textColor: '#ffffff',
    },
  });
}

export default async function TodaysLeaderboardPage() {
  //const currentPage = parseInt(searchParams.page as string) || 1;

  const topThreeUsers = getMostQuestionsAnswered(3);

  return (
    <>
      {/** @ts-ignore - this is the valid type */}
      <LeaderboardHero topThreeUsersPromise={topThreeUsers} />
      <div className="lg:container flex flex-col xl:flex-row gap-10 mt-5">
        <Suspense fallback={<div>Loading...</div>}>
          <LeaderboardMostQuestionsAnswered />
        </Suspense>
      </div>
    </>
  );
}
