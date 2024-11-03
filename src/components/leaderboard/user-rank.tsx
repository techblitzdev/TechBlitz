import { getUserAnswer } from '@/actions/answers/get-user-answer';
import { getUserAnswerRank } from '@/actions/leaderboard/get-user-rank';
import { getUserFromDb } from '@/actions/user/get-user';
import { formatSeconds } from '@/utils/time';
import { getUserDisplayName } from '@/utils/user';

export default async function UserRank(opts: {
  questionUid: string;
  userUid: string;
}) {
  const { questionUid, userUid } = opts;

  const userData = await getUserFromDb(userUid);
  if (!userData) return null;

  const userRank = await getUserAnswerRank({
    questionUid,
    userUid,
  });

  // go get the answer
  const userAnswer = await getUserAnswer({
    questionUid,
    userUid,
  });

  return (
    <div className="text-white text-sm flex w-full justify-between items-center">
      {userRank ? `${userRank}.` : 'Not ranked'} {getUserDisplayName(userData)}{' '}
      (You)
      {userAnswer && (
        <div className="">{formatSeconds(userAnswer.timeTaken || 0)}</div>
      )}
    </div>
  );
}
