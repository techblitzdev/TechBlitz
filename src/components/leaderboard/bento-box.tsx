import { Question } from '@/types/Questions';
import JsonDisplay from '../global/json-display';
import { getFastestTimes } from '@/actions/leaderboard/get-fastest';
import { formatSeconds } from '@/utils/time';
import { getUserDisplayName } from '@/utils/user';

/**
 * Component to display the top 3(?) users on the leaderboard for the
 * current task for the day.
 *
 */
export default async function TodaysLeaderboardBentoBox(opts: {
  todaysQuestion: Question | null;
}) {
  const { todaysQuestion } = opts;
  if (!todaysQuestion) return null;

  const { fastestTimes } = await getFastestTimes({
    numberOfResults: 3,
    questionUid: todaysQuestion?.uid,
  });
  return (
    <div className="font-satoshi">
      {fastestTimes.length === 0 && (
        <p className="font-semibold text-xs">No fastest times yet!</p>
      )}
      {fastestTimes.map((time, i) => {
        return (
          <div key={i}>
            {i + 1}.{' '}
            <span className="font-semibold">
              {getUserDisplayName(time.user)}
            </span>
            - {formatSeconds(time.timeTaken || 0)}
          </div>
        );
      })}
    </div>
  );
}
