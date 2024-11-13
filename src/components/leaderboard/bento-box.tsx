import { Question } from '@/types/Questions';
import { getFastestTimes } from '@/actions/leaderboard/get-fastest';
import FastestTimes from './fastest-times';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, FlameIcon, Trophy } from 'lucide-react';
import Link from 'next/link';
import UserRank from './user-rank';
import { getUserFromSession } from '@/actions/user/get-user';
import { getLongestStreaks } from '@/actions/leaderboard/get-longest-streaks';
import { getUserDisplayName } from '@/utils/user';
import { Grid } from '../ui/grid';

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
    <div className="overflow-hidden flex flex-col h-full justify-between group">
      <div className="flex flex-col h-full justify-between relative overflow-hidden">
        <div>
          <div className="bg-black-50/10">
            <div className="flex items-center p-4">
              <h6 className="text-xl">Today's Top User's</h6>
              <ArrowRight className="size-4 ml-1 group-hover:ml-2 duration-300" />
            </div>
            <Separator className="bg-black-50" />
          </div>
          <FastestTimes fastestTimes={fastestTimes} />
        </div>

        <div className="z-20 shadow-md m-4 bg-black-100 border border-black-50 rounded-md overflow-hidden">
          <h6 className="p-2 py-3 bg-black-50/10">Longest streaks</h6>
          <Separator className="bg-black-50" />
          <ol className="flex flex-col divide-y divide-black-50 overflow-hidden">
            {longestStreaks.map((streak, i) => (
              <li
                key={i}
                className={`grid grid-cols-12 text-sm px-2 py-2.5 font-satoshi ${
                  i % 2 === 0 ? 'bg-black' : 'bg-black-75'
                }`}
              >
                <span className="flex w-full justify-between items-center col-span-2">
                  {streak.streak}{' '}
                  <FlameIcon className="fill-red-500 text-orange-500 mr-2" />
                </span>
                <p className="text-sm col-span-8">
                  {getUserDisplayName(streak.user)}
                </p>
              </li>
            ))}
          </ol>
        </div>
        <Grid size={20} position="bottom-right" />
      </div>
      <div className="flex flex-col overflow-hidden">
        <Separator className="bg-black-50 " />
        <div className="px-4 pb-4 bg-black-50/10 pt-4">
          <p className="text-xs">Your rank:</p>
          <UserRank
            questionUid={todaysQuestion.uid}
            userUid={user?.user?.id || ''}
          />
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
