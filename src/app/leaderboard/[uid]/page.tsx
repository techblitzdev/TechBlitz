import { getFastestTimes } from '@/actions/leaderboard/get-fastest';
import { formatSeconds } from '@/utils/time';

export default async function TodaysLeaderboardPage({
  params,
}: {
  params: { uid: string };
}) {
  const { uid } = params;
  const { fastestTimes } = await getFastestTimes({
    numberOfResults: 10,
    questionUid: uid,
  });

  return (
    <div className="font-satoshi">
      {fastestTimes.map((time, i) => {
        return (
          <div key={i}>
            {i + 1}. <span className="font-semibold">{time.user?.name}</span>-{' '}
            {formatSeconds(time.timeTaken || 0)}
          </div>
        );
      })}
    </div>
  );
}
