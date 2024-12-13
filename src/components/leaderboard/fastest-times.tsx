import { AnswerWithUser } from '@/types/Answers';
import DashboardLearderboardUserCard from './user-card';

export default async function FastestTimes(opts: {
  fastestTimes: AnswerWithUser[];
}) {
  const { fastestTimes } = opts;

  // Sort by time taken
  const orderedTimes = fastestTimes.sort(
    (a, b) => (a?.timeTaken ?? Infinity) - (b?.timeTaken ?? Infinity)
  );

  if (orderedTimes.length === 0) return null;

  return (
    <div className="w-full w-full md:max-w-md mx-auto">
      {orderedTimes.map((entry, index) => {
        return (
          <DashboardLearderboardUserCard
            entry={entry}
            index={index}
          />
        );
      })}
    </div>
  );
}
