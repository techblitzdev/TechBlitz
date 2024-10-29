import { getFastestTimes } from '@/actions/leaderboard/get-fastest';
import { getTodaysQuestion } from '@/actions/questions/get-today';
import TodaysLeaderboardPageClient from '@/app/(default_layout)/leaderboard/today/page.client';

export default async function TodaysLeaderboardPage() {
  const todayQuestion = await getTodaysQuestion();
  if (!todayQuestion || !todayQuestion?.uid) return null;

  const { fastestTimes, total } = await getFastestTimes({
    numberOfResults: 1,
    questionUid: todayQuestion?.uid || '',
    page: 1,
    pageSize: 20,
  });

  return (
    <div className="font-satoshi">
      {todayQuestion?.uid && (
        <TodaysLeaderboardPageClient
          initialFastestTimes={fastestTimes}
          initialTotal={total}
          questionUid={todayQuestion?.uid || ''}
        />
      )}
    </div>
  );
}
