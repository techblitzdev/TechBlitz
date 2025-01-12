import { Question } from '@/types/Questions';
import { getFastestTimes } from '@/utils/data/leaderboard/get-fastest';
import FastestTimes from './fastest-times';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, FlameIcon, Trophy } from 'lucide-react';
import Link from 'next/link';
import { getLongestStreaks } from '@/utils/data/leaderboard/get-longest-streaks';
import { getUserDisplayName } from '@/utils/user';
import { Grid } from '@/components/ui/grid';

export default async function TodaysLeaderboardBentoBox(opts: {
  todaysQuestion: Question | null;
}) {
  const { todaysQuestion } = opts;

  // run this in parallel as they do not depend on each other
  const [{ fastestTimes }, longestStreaks] = await Promise.all([
    getFastestTimes({
      numberOfResults: 10,
      questionUid: todaysQuestion?.uid || '',
    }),
    getLongestStreaks(),
  ]);

  return (
    <div className="overflow-hidden flex flex-col h-full justify-between group">
      <div className="flex flex-col h-full justify-between relative overflow-hidden">
        <div>
          <Link href="/leaderboard" className="bg-black-100 relative">
            <div className="flex items-center p-4">
              <h6 className="text-xl">Today's Top User's</h6>
              <ArrowRight className="size-4 ml-1 group-hover:ml-2 duration-300" />
            </div>
            <Separator className="bg-black-50" />
          </Link>
          {fastestTimes.length === 0 && todaysQuestion?.uid ? (
            <Card className="rounded-none border-none pt-4 group">
              <CardContent className="text-center">
                <Link href={`/question/${todaysQuestion.slug}`}>
                  <Trophy className="mx-auto mb-2 text-yellow-500" size={24} />
                  <p className="text-sm text-white">No fastest times yet!</p>
                  <p className="text-xs text-white mt-1">
                    Be the first to complete today's challenge!
                  </p>
                  <div className="bg-white group-hover:bg-white/75 w-fit mt-2 text-black rounded-md px-3 py-1.5 text-xs justify-self-center">
                    Answer now
                  </div>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <FastestTimes fastestTimes={fastestTimes} />
          )}
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
          <p className="text-xs text-gray-400">Your rank:</p>
        </div>
      </div>
    </div>
  );
}
