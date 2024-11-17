import { getUserDisplayName } from '@/utils/user';
import Card from '../global/Card';
import { FlameIcon, User } from 'lucide-react';
import { getLongestStreaks } from '@/actions/leaderboard/get-longest-streaks';

const header = () => {
  return (
    <div className="flex items-center w-full justify-between">
      <div className="flex gap-x-2 items-center">
        <FlameIcon className="fill-red-500 text-orange-500" />
        <h3 className="text-lg">Longest streaks</h3>
      </div>
    </div>
  );
};

export default async function LeaderboardLongestStreaks(opts: {
  userUid?: string;
}) {
  const { userUid } = opts;

  const longestStreaks = await getLongestStreaks();

  return (
    <Card header={header()}>
      <div className="flex flex-col divide-y-[1px] divide-black-50">
        {longestStreaks.map((streak, i) => (
          <li
            key={i}
            className={`flex items-center justify-between w-full px-4 py-3 font-ubuntu ${
              i % 2 === 0 ? 'bg-black' : 'bg-black-75'
            }`}
          >
            <div className="flex items-center gap-x-4">
              <span>#{i + 1}</span>
              <div className="flex items-center gap-2">
                {streak.user.userProfilePicture ? (
                  <img
                    src={streak?.user.userProfilePicture}
                    className="rounded-full size-6"
                  />
                ) : (
                  <div className="rounded-full size-6 flex items-center justify-center bg-black-50">
                    <User className="size-4" />
                  </div>
                )}
                <p>
                  {getUserDisplayName(streak.user).length > 15
                    ? `${getUserDisplayName(streak.user).substring(0, 15)}...`
                    : getUserDisplayName(streak.user)}
                </p>
                {userUid === streak.user.uid && (
                  <span className="text-xs text-gray-500">(You)</span>
                )}
              </div>
            </div>
            <div className="flex items-center w-fit">
              {streak.streak}{' '}
              <FlameIcon className="fill-red-500 text-orange-500" />
            </div>
          </li>
        ))}
      </div>
    </Card>
  );
}
