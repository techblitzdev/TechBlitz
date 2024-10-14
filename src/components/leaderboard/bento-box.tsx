import { Question } from '@/types/Questions';
import JsonDisplay from '../global/json-display';
import { getFastestTimes } from '@/actions/leaderboard/get-fastest';

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
    <>
      {fastestTimes.map((time, i) => {
        return (
          <div key={i}>
            {i + 1}. {time.user?.name} - {time.timeTaken}
          </div>
        );
      })}
    </>
  );
}
