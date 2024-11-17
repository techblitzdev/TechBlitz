import { getMostQuestionsAnswered } from '@/actions/leaderboard/get-most-questions-answered';
import Card from '../global/Card';
import { getUserDisplayName } from '@/utils/user';
import { Trophy, User } from 'lucide-react';

const header = () => {
  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex flex-col gap-y-0.5">
        <div className="flex gap-x-2 items-center">
          <Trophy className="size-5 text-yellow-400" />
          <h3 className="text-lg">Top users by questions answered</h3>
        </div>
        <p className="text-xs text-gray-400">
          Become a top user for a chance to win a prize at the end of the month!
        </p>
      </div>
    </div>
  );
};

export default async function LeaderboardMostQuestionsAnswered(opts: {
  userUid?: string;
}) {
  const { userUid } = opts;

  const topUsersByQuestionCount = await getMostQuestionsAnswered();

  return (
    <Card header={header()}>
      <div className="flex flex-col divide-y-[1px] divide-black-50">
        {/* Headings Row */}
        <div className="flex items-center justify-between px-4 py-2 bg-black-75 font-bold font-ubuntu text-xs">
          <span className="w-[15%]">Position</span>
          <span className="w-[50%]">User</span>
          <span className="w-[35%] text-right">Answered</span>
        </div>

        {topUsersByQuestionCount.map((user, index) => (
          <div
            key={user.uid}
            className={`flex items-center justify-between font-ubuntu px-4 py-3 ${
              index % 2 === 0 ? 'bg-black' : 'bg-black-75'
            }`}
          >
            {/* Position */}
            <span className="w-[15%]">#{index + 1}</span>

            {/* User */}
            <div className="w-[50%] flex items-center gap-4">
              {user?.userProfilePicture ? (
                <img
                  src={user.userProfilePicture}
                  className="rounded-full size-6"
                />
              ) : (
                <div className="rounded-full size-6 flex items-center justify-center bg-black-50">
                  <User className="size-4" />
                </div>
              )}
              <span>{user.username || 'Anonymous'}</span>
              {userUid === user.uid && (
                <span className="text-xs text-gray-500">(You)</span>
              )}
            </div>

            {/* Answered */}
            <span className="w-[35%] text-right">{user._count.answers}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
