import { getUserAnswer } from '@/actions/answers/get-user-answer';
import { getUserAnswerRank } from '@/actions/leaderboard/get-user-rank';
import { getUserFromDb } from '@/actions/user/get-user';
import { convertSecondsToTime, formatSeconds } from '@/utils/time';
import { getUserDisplayName } from '@/utils/user';

export default async function UserRank(opts: {
  questionUid: string;
  userUid: string;
}) {
  const { questionUid, userUid } = opts;

  const userData = await getUserFromDb(userUid);
  if (!userData) return null;

  const displayName = getUserDisplayName(userData);

  const userRank = await getUserAnswerRank({
    questionUid,
    userUid,
  });

  // go get the answer
  const userAnswer = await getUserAnswer({
    questionUid,
    userUid,
  });

  const timeTaken = convertSecondsToTime(userAnswer?.timeTaken ?? 0);

  return (
    <div className="gap-x-4 text-white text-sm font-semibold font-satoshi flex w-full justify-between items-center">
      <p className="flex items-center gap-x-4">
        <span>{userRank ? `#${userRank}` : 'Not ranked'} </span>
        <span>
          {displayName.length > 15
            ? `${displayName.substring(0, 15)}...`
            : displayName}
        </span>
      </p>
      <div className="text-xs bg-white text-black py-1 px-2 rounded-md">
        {timeTaken.minutes > 0 && (
          <span>
            You answered in {timeTaken.minutes} minute
            {timeTaken.minutes > 1 && 's'}{' '}
          </span>
        )}
        <span>{timeTaken.seconds} seconds</span>
      </div>
    </div>
  );
}
