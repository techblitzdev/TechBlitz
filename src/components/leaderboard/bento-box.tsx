import { Question } from '@/types/Questions';
import { getFastestTimes } from '@/actions/leaderboard/get-fastest';
import FastestTimes from './fastest-times';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import Link from 'next/link';
import UserRank from './user-rank';
import { getUserFromSession } from '@/actions/user/get-user';
import { getLongestStreaks } from '@/actions/leaderboard/get-longest-streaks';
import { getUserDisplayName } from '@/utils/user';

export default async function TodaysLeaderboardBentoBox(opts: {
  todaysQuestion: Question | null;
}) {
  const { todaysQuestion } = opts;
  if (!todaysQuestion || !todaysQuestion?.uid) return null;
  const { data: user } = await getUserFromSession();

  const { fastestTimes } = await getFastestTimes({
    numberOfResults: 10,
    questionUid: todaysQuestion?.uid,
  });

  const longestStreaks = await getLongestStreaks();

  if (fastestTimes.length === 0 && todaysQuestion?.uid) {
    return (
      <Card className="bg-black border-none">
        <CardContent className="text-center">
          <Link href={`/question/${todaysQuestion.uid}`}>
            <Trophy className="mx-auto mb-2 text-white" size={24} />
            <p className="text-sm text-white">No fastest times yet!</p>
            <p className="text-xs text-white mt-1">
              Be the first to complete today's challenge!
            </p>
          </Link>
        </CardContent>
      </Card>
    );
  }
  {
  }

  return (
    <div className="overflow-hidden flex flex-col h-full justify-between">
      <div>
        <div className="bg-black-50/10">
          <h6 className="text-xl p-4">Today's Top User's</h6>
          <Separator className="bg-black-50" />
        </div>
        <FastestTimes fastestTimes={fastestTimes} />
      </div>

      <div>
        <div className="m-4 p-4 bg-black-100 border border-black-50 rounded-md">
          Longest streaks
          {longestStreaks.map((streak, i) => (
            <div key={i} className="flex justify-between">
              {streak.rank}. {getUserDisplayName(streak.user)} - {streak.streak}{' '}
              days
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-y-2">
          <Separator className="bg-black-50 my-1" />
          <div className="px-4 pb-3">
            <p className="text-xs">Your rank:</p>
            <UserRank
              questionUid={todaysQuestion.uid}
              userUid={user?.user?.id || ''}
            />
          </div>
        </div>
      </div>
      {/* <Card className="bg-black-100 border border-black-50 text-white h-full overflow-hidden">
        <CardContent className="pt-6 pb-4 flex flex-col h-full justify-between p-0">
          {restOfFastestTimes.length > 0 && (
            <>
              <Separator className="my-2" />
              <ol className="space-y-1">
                {restOfFastestTimes.map((time, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between py-1 px-2 rounded hover:bg-black-50 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      <span className="text-white">{i + 4}.</span>
                      <span className="font-medium text-white">
                        {getUserDisplayName(time.user)}
                      </span>
                    </div>
                    <span className="text-white font-satoshi">
                      {formatSeconds(time.timeTaken || 0)}
                    </span>
                  </li>
                ))}
              </ol>
            </>
          )}
        </CardContent>
      </Card> */}
    </div>
  );
}
