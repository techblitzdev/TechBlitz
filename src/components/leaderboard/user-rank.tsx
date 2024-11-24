import { getUserAnswer } from '@/actions/answers/get-user-answer';
import { getUserAnswerRank } from '@/actions/leaderboard/get-user-rank';
import { getUserFromDb } from '@/actions/user/get-user';
import { formatSeconds } from '@/utils/time';
import { getUserDisplayName } from '@/utils/user';
import { Button } from '../ui/button';
import { redirect } from 'next/navigation';

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

  if (!userAnswer) {
    return (
      <form
        action={async () => {
          'use server';
          redirect(`/question/${questionUid}`);
        }}
        className="flex justify-between w-full items-center"
      >
        <p className="text-white text-sm font-semibold font-satoshi">
          Not ranked
        </p>
        <Button variant="accent">Answer now!</Button>
      </form>
    );
  }

  const displayTime = formatSeconds(userAnswer?.timeTaken || 0);

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
        <p>{displayTime}</p>
      </div>
    </div>
  );
}
