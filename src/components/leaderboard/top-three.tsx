import { getUserFromSession } from '@/actions/user/get-user';
import { getUserDisplayName } from '@/utils/user';

export default async function TopThreeLeaderboardBentoBox(opts: {
  fastestTimes: any[];
}) {
  const { fastestTimes } = opts;
  const { data: currentUser } = await getUserFromSession();

  // First sort by time taken
  const orderedTimes = fastestTimes.sort((a, b) => a.timeTaken - b.timeTaken);

  if (orderedTimes.length === 0) return null;

  // Helper function to render user name with optional '(You)' label
  const renderUserName = (userEntry: any, isFirstPlace: boolean = false) => {
    const isCurrentUser = currentUser?.user?.id === userEntry.user.uid;
    const nameClasses = isFirstPlace
      ? 'text-yellow-400 font-bold text-lg text-center'
      : 'font-bold text-lg';
    const nameColor = isFirstPlace
      ? 'text-yellow-400'
      : userEntry === orderedTimes[1]
      ? 'text-gray-300'
      : 'text-amber-600';

    return (
      <div
        className={`flex flex-col items-center gap-1 ${nameColor} ${nameClasses}`}
      >
        {getUserDisplayName(userEntry.user)}
        {isCurrentUser && <span className="text-xs">(You)</span>}
      </div>
    );
  };

  return (
    <div className="relative h-60 w-full">
      {/* First Place - Center, Tallest */}
      {orderedTimes[0] && (
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 flex flex-col items-center z-30">
          <div className="flex flex-col items-center gap-2 mb-2">
            <div className="text-yellow-400 font-bold text-xl">👑</div>
            {renderUserName(orderedTimes[0], true)}
            <div className="text-yellow-400 font-semibold">1st</div>
          </div>
          <div className="w-28 h-32 bg-gradient-to-b from-yellow-500/20 to-yellow-500/10 rounded-t-lg border-t border-x border-yellow-400/30" />
        </div>
      )}

      {/* Second Place - Left, Medium Height */}
      {orderedTimes[1] && (
        <div className="absolute left-1/4 bottom-0 -translate-x-1/2 flex flex-col items-center">
          <div className="flex flex-col items-center gap-2 mb-2">
            {renderUserName(orderedTimes[1])}
            <div className="text-gray-300 font-semibold">2nd</div>
          </div>
          <div className="w-28 h-24 bg-gradient-to-b from-gray-500/20 to-gray-500/10 rounded-t-lg border-t border-x border-gray-400/30" />
        </div>
      )}

      {/* Third Place - Right, Shortest */}
      {orderedTimes[2] && (
        <div className="absolute left-3/4 bottom-0 -translate-x-1/2 flex flex-col items-center">
          <div className="flex flex-col items-center gap-2 mb-2">
            {renderUserName(orderedTimes[2])}
            <div className="text-amber-600 font-semibold">3rd</div>
          </div>
          <div className="w-28 h-16 bg-gradient-to-b from-amber-500/20 to-amber-500/10 rounded-t-lg border-t border-x border-amber-600/30" />
        </div>
      )}
    </div>
  );
}
