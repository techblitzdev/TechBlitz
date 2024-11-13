import { getUserFromSession } from '@/actions/user/get-user';
import { AnswerWithUser } from '@/types/Answers';
import { getUserDisplayName } from '@/utils/user';

export default async function TopThreeLeaderboard(opts: {
  fastestTimes: AnswerWithUser[];
}) {
  const { fastestTimes } = opts;
  const { data: currentUser } = await getUserFromSession();

  // Sort by time taken
  const orderedTimes = fastestTimes.sort(
    (a, b) => (a?.timeTaken ?? Infinity) - (b?.timeTaken ?? Infinity)
  );

  if (orderedTimes.length === 0) return null;

  const places = [
    { bg: 'bg-yellow-900', text: 'text-white', label: '1st' },
    { bg: 'bg-gray-100', text: 'text-whtie', label: '2nd' },
    { bg: 'bg-amber-100', text: 'text-white', label: '3rd' },
  ];

  return (
    <div className="space-y-2 w-full max-w-md mx-auto">
      {orderedTimes.slice(0, 3).map((entry, index) => {
        const isCurrentUser = currentUser?.user?.id === entry.user.uid;
        const place = places[index];

        return (
          <div
            key={entry.user.uid}
            className={`${place.bg} p-2 flex items-center justify-between`}
          >
            <span className={`${place.text} font-bold`}>{place.label}</span>
            <div className="flex flex-col items-end">
              <span className={`${place.text} font-semibold`}>
                {getUserDisplayName(entry.user)}
              </span>
              {isCurrentUser && (
                <span className="text-xs text-gray-500">(You)</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
