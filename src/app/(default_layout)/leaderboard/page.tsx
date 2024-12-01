import { getTodaysQuestion } from '@/actions/questions/get-today';
import Hero from '@/components/global/hero';
import LeaderboardLongestStreaks from '@/components/leaderboard/leaderboard-longest-streaks';
import LeaderboardMostQuestionsAnswered from '@/components/leaderboard/leaderboard-most-questions-answered';
import LeaderboardTodayBoard from '@/components/leaderboard/leaderboard-today-board';
import { useUserServer } from '@/hooks/useUserServer';

export default async function TodaysLeaderboardPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const currentPage = parseInt(searchParams.page as string) || 1;

  const user = await useUserServer();

  const todayQuestion = await getTodaysQuestion();

  return (
    <>
      <Hero
        heading="Top users"
        subheading="See how you stack up against the rest of the community, and try to battle your way to the top!"
      />
      <div className="container flex flex-col xl:flex-row gap-10 mt-5">
        <div className="w-full xl:w-1/2">
          <LeaderboardTodayBoard
            todayQuestion={todayQuestion}
            currentPage={currentPage}
            userUid={user?.uid}
          />
        </div>
        <div className="w-full flex flex-col gap-10 xl:w-1/2">
          <LeaderboardMostQuestionsAnswered userUid={user?.uid} />
          <LeaderboardLongestStreaks userUid={user?.uid} />
        </div>
      </div>
    </>
  );
}
