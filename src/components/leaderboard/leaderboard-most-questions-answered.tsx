import { getMostQuestionsAnswered } from '@/actions/leaderboard/get-most-questions-answered';
import Card from '../global/Card';
import { getUserDisplayName } from '@/utils/user';
import { User } from 'lucide-react';

const header = () => {
  return (
    <div className="flex items-center w-full justify-between">
      <div className="flex gap-x-1 items-center">
        <h3 className="text-lg">Top user's by questions answered</h3>
      </div>
    </div>
  );
};

export default async function LeaderboardMostQuestionsAnswered() {
  const topUsersByQuestionCount = await getMostQuestionsAnswered();

  return (
    <Card header={header()}>
      <div className="flex flex-col divide-y-[1px] divide-black-50">
        {topUsersByQuestionCount.map((user, index) => (
          <div
            key={user.uid}
            className={`flex items-center justify-between font-ubuntu p-4 ${
              index % 2 === 0 ? 'bg-black' : 'bg-black-75'
            }`}
          >
            <div className="flex gap-4 items-center">
              <span>{index + 1}.</span>
              <div className="flex items-center gap-2">
                {user?.userProfilePicture ? (
                  <img
                    src={user.userProfilePicture}
                    className="rounded-full size-5"
                  />
                ) : (
                  <div className="rounded-full size-5 flex items-center justify-center bg-black-50">
                    <User className="size-3" />
                  </div>
                )}
                <span>{user.username || user.email}</span>
              </div>
            </div>
            <span>{user._count.answers}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
