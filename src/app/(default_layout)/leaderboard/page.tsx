import { getFastestTimes } from '@/actions/leaderboard/get-fastest';
import { getTodaysQuestion } from '@/actions/questions/get-today';
import NoDailyQuestion from '@/components/global/errors/no-daily-question';
import LeaderboardTodayBoard from '@/components/leaderboard/leaderboard-today-board';

export default async function TodaysLeaderboardPage() {
  const todayQuestion = await getTodaysQuestion();
  if (!todayQuestion || !todayQuestion?.uid) return <NoDailyQuestion />;

  return (
    <div className="container flex gap-10">
      <div className="w-2/5">
        <LeaderboardTodayBoard todayQuestion={todayQuestion} />
      </div>
    </div>
  );
}
