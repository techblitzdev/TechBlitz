import { getTodaysQuestion } from '@/actions/questions/get-today';
import Card from '@/components/global/Card';
import NoDailyQuestion from '@/components/global/errors/no-daily-question';
import LeaderboardTodayBoard from '@/components/leaderboard/leaderboard-today-board';

export default async function TodaysLeaderboardPage() {
  const todayQuestion = await getTodaysQuestion();
  if (!todayQuestion || !todayQuestion?.uid) return <NoDailyQuestion />;

  return (
    <div className="container flex flex-col lg:flex-row gap-10">
      <div className="w-full lg:w-2/5">
        <LeaderboardTodayBoard todayQuestion={todayQuestion} />
      </div>
      <div className="w-full lg:w-2/5">
        <Card>
          <div className="p-4">
            <h3 className="text-lg">Leaderboard</h3>
            <p>Leaderboard for all time</p>
          </div>
        </Card>
      </div>

      <div className="w-full lg:w-1/5">
        <Card>
          <div className="p-4">
            <h3 className="text-lg">Leaderboard</h3>
            <p>Leaderboard for all time</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
