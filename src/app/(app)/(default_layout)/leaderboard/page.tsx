import LeaderboardHero from '@/components/app/leaderboard/leaderboard-hero';
import LeaderboardMostQuestionsAnswered from '@/components/app/leaderboard/leaderboard-most-questions-answered';
import { useUserServer } from '@/hooks/use-user-server';
import { createMetadata } from '@/utils/seo';
import { getMostQuestionsAnswered } from '@/utils/data/leaderboard/get-most-questions-answered';

export async function generateMetadata() {
  return createMetadata({
    title: 'Leaderboard | TechBlitz',
    description: 'See how you stack up against the rest of the community.',
    canonicalUrl: '/leaderboard',
  });
}

export default async function TodaysLeaderboardPage() {
  //const currentPage = parseInt(searchParams.page as string) || 1;

  const [user, topThreeUsers] = await Promise.all([
    useUserServer(),
    getMostQuestionsAnswered(3),
  ]);

  return (
    <>
      {/** @ts-ignore - this is the valid type */}
      <LeaderboardHero topThreeUsers={topThreeUsers} />
      <div className="lg:container flex flex-col xl:flex-row gap-10 mt-5">
        <LeaderboardMostQuestionsAnswered userUid={user?.uid} />
      </div>
    </>
  );
}
