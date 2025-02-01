import { Button } from '@/components/ui/button';

import { getUserAnswer } from '@/utils/data/answers/get-user-answer';
import { getUserAnswerRank } from '@/utils/data/leaderboard/get-user-rank';
import { useUserServer } from '@/hooks/use-user-server';

import { formatSeconds } from '@/utils/time';
import { getUserDisplayName } from '@/utils/user';
import Link from 'next/link';
import { shortenText } from '@/utils';

export default async function UserRank(opts: { questionUid: string }) {
  const { questionUid } = opts;

  // run this in parallel as they do not depend on each other
  const [userData, userRank, userAnswer] = await Promise.all([
    useUserServer(),
    getUserAnswerRank({ questionUid }),
    getUserAnswer({ questionUid }),
  ]);
  if (!userData) return null;

  const displayName = getUserDisplayName(userData);

  if (!userAnswer) {
    return (
      <div className="flex justify-between w-full items-center">
        <p className="text-white text-sm font-semibold font-onest">Not ranked</p>
        <Link href={`/question/${questionUid}`} className="hidden xl:block">
          <Button variant="accent">Answer now!</Button>
        </Link>
      </div>
    );
  }

  const displayTime = formatSeconds(userAnswer?.timeTaken || 0);

  return (
    <div className="gap-x-4 text-white text-sm font-semibold font-satoshi flex w-full justify-between items-center">
      <p className="flex items-center gap-x-4">
        <span>{userRank ? `#${userRank}` : 'Not ranked'} </span>
        <span>{shortenText(displayName, 15)}</span>
      </p>
      <div className="text-xs bg-white text-black py-1 px-2 rounded-md">
        <p>{displayTime}</p>
      </div>
    </div>
  );
}
