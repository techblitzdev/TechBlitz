import { getLongestStreaks } from '@/actions/leaderboard/get-longest-streaks';
import { getTodaysQuestion } from '@/actions/questions/get-today';
import Card from '@/components/global/Card';
import NoDailyQuestion from '@/components/global/errors/no-daily-question';
import LeaderboardLongestStreaks from '@/components/leaderboard/leaderboard-longest-streaks';
import LeaderboardMostQuestionsAnswered from '@/components/leaderboard/leaderboard-most-questions-answered';
import LeaderboardTodayBoard from '@/components/leaderboard/leaderboard-today-board';

export default async function TodaysLeaderboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const currentPage = parseInt(searchParams.page as string) || 1;

  const todayQuestion = await getTodaysQuestion();
  if (!todayQuestion || !todayQuestion?.uid) return <NoDailyQuestion />;

  return (
    <div className="container flex flex-col lg:flex-row gap-10 mt-5">
      <div className="w-full lg:w-1/2">
        <LeaderboardTodayBoard
          todayQuestion={todayQuestion}
          currentPage={currentPage}
        />
      </div>
      <div className="w-full flex flex-col gap-10 lg:w-1/2">
        <LeaderboardMostQuestionsAnswered />
        <LeaderboardLongestStreaks />
      </div>
    </div>
  );
}
