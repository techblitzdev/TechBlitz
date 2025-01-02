import { getMostQuestionsAnswered } from '@/actions/leaderboard/get-most-questions-answered';
import Card from '@/components/global/Card';
import ProfilePicture from '@/components/ui/profile-picture';
import { UserRecord } from '@/types/User';
import { shortenText } from '@/utils';
import { getUserDisplayName } from '@/utils/user';
import { Trophy } from 'lucide-react';

const header = () => {
  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex flex-col gap-y-0.5">
        <div className="flex gap-x-2 items-center">
          <Trophy className="hidden md:block size-5 text-yellow-400" />
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
        <div className="flex items-center px-4 py-2 bg-black-75 font-medium font-ubuntu text-xs">
          <span className="w-[30%]">Position</span>
          <span className="w-[50%]">User</span>
          <span className="w-[20%] text-right">Answered</span>
        </div>

        {topUsersByQuestionCount.map((user, index) => (
          <div
            key={user.uid}
            className={`flex items-center px-4 py-3 ${
              index % 2 === 0 ? 'bg-black' : 'bg-[#000]'
            }`}
          >
            {/* Position */}
            <span className="w-[30%]">#{index + 1}</span>

            {/* User */}
            <div className="w-[50%] flex items-center gap-4">
              <ProfilePicture
                src={user.userProfilePicture}
                alt={`${user.username} profile picture`}
              />
              <span>
                {shortenText(
                  getUserDisplayName(user as unknown as UserRecord),
                  25
                )}
              </span>
              {userUid === user.uid && (
                <span className="text-xs text-gray-500">(You)</span>
              )}
            </div>

            {/* Answered */}
            <span className="w-[20%] text-right">{user._count.answers}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
