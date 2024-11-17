import { getUserDisplayName } from '@/utils/user';
import Card from '../global/Card';
import { FlameIcon, User } from 'lucide-react';
import { getLongestStreaks } from '@/actions/leaderboard/get-longest-streaks';

const header = () => {
  return (
    <div className="flex items-center w-full justify-between">
      <div className="flex gap-x-1 items-center">
        <h3 className="text-lg">Longest streaks</h3>
      </div>
    </div>
  );
};

export default async function LeaderboardLongestStreaks() {
  const longestStreaks = await getLongestStreaks();

  return (
    <Card header={header()}>
      <div className="flex flex-col divide-y-[1px] divide-black-50">
        {longestStreaks.map((streak, i) => (
          <li
            key={i}
            className={`flex items-center justify-between w-full p-4 font-ubuntu ${
              i % 2 === 0 ? 'bg-black' : 'bg-black-75'
            }`}
          >
            <div className="flex items-center gap-x-4">
              <span>{i + 1}.</span>
              <div className="flex items-center gap-2">
                {streak.user.userProfilePicture ? (
                  <img
                    src={streak?.user.userProfilePicture}
                    className="rounded-full size-5"
                  />
                ) : (
                  <div className="rounded-full size-5 flex items-center justify-center bg-black-50">
                    <User className="size-3" />
                  </div>
                )}
                <p>{getUserDisplayName(streak.user)}</p>
              </div>
            </div>
            <div className="flex items-center w-fit">
              {streak.streak}{' '}
              <FlameIcon className="fill-red-500 text-orange-500 mr-2" />
            </div>
          </li>
        ))}
      </div>
    </Card>
  );
}
