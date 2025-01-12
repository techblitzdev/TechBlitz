import { getTodaysQuestion } from '@/utils/data/questions/get-today';
import Hero from '@/components/global/hero';
import LeaderboardLongestStreaks from '@/components/app/leaderboard/leaderboard-longest-streaks';
import LeaderboardMostQuestionsAnswered from '@/components/app/leaderboard/leaderboard-most-questions-answered';
import LeaderboardTodayBoard from '@/components/app/leaderboard/leaderboard-today-board';
import { useUserServer } from '@/hooks/use-user-server';
import { createMetadata } from '@/utils/seo';
import LeaderboardHero from '@/components/app/leaderboard/leaderboard-hero';
import { getMostQuestionsAnswered } from '@/utils/data/leaderboard/get-most-questions-answered';

export async function generateMetadata() {
  return createMetadata({
    title: 'Leaderboard | TechBlitz',
    description: 'See how you stack up against the rest of the community.',
    canonicalUrl: '/leaderboard',
  });
}

export default async function TodaysLeaderboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const currentPage = parseInt(searchParams.page as string) || 1;

  const topThreeUsers = await getMostQuestionsAnswered(3);

  const [user, todayQuestion] = await Promise.all([
    useUserServer(),
    getTodaysQuestion(),
  ]);

  return (
    <>
      <LeaderboardHero topThreeUsers={topThreeUsers} />
      <div className="lg:container flex flex-col xl:flex-row gap-10 mt-5"></div>
    </>
  );
}
