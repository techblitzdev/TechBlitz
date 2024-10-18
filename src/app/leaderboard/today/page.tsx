import { getFastestTimes } from '@/actions/leaderboard/get-fastest';
import { getTodaysQuestion } from '@/actions/questions/get-today';
import TodaysLeaderboardPageClient from '@/app/(questions)/previous-questions/page.client';
import { formatSeconds } from '@/utils/time';

export default async function TodaysLeaderboardPage() {
  const todayQuestion = await getTodaysQuestion();

  const { fastestTimes, total } = await getFastestTimes({
    numberOfResults: 10,
    questionUid: todayQuestion?.uid || '',
    page: 1,
    pageSize: 20,
  });

  return (
    <div className="font-satoshi">
      {fastestTimes.map((time, i) => {
        return (
          <div key={i}>
            {i + 1}. <span className="font-semibold">{time.user?.name}</span>:{' '}
            {formatSeconds(time.timeTaken || 0)}
          </div>
        );
      })}
      <TodaysLeaderboardPageClient fastestTimes={fastestTimes} total={total} />
    </div>
  );
}
