import { AnswerWithUser } from '@/types/Answers';
import DashboardLeaderboardUserCard from './user-card';

export default async function FastestTimes(opts: { fastestTimes: AnswerWithUser[] }) {
  const { fastestTimes } = opts;

  // Sort by time taken
  const orderedTimes = fastestTimes.sort(
    (a, b) => (a?.timeTaken ?? Infinity) - (b?.timeTaken ?? Infinity)
  );

  if (orderedTimes.length === 0) return null;

  return (
    <div className="w-full md:max-w-md lg:max-w-xl mx-auto">
      {orderedTimes.map((entry, index) => {
        return <DashboardLeaderboardUserCard key={entry.uid} entry={entry} index={index} />;
      })}
    </div>
  );
}
