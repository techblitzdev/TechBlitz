import React from 'react';
import { Question } from '@/types/Questions';
import { getFastestTimes } from '@/actions/leaderboard/get-fastest';
import { formatSeconds } from '@/utils/time';
import { getUserDisplayName } from '@/utils/user';
import TopThreeLeaderboardBentoBox from './top-three';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

export default async function TodaysLeaderboardBentoBox(opts: {
  todaysQuestion: Question | null;
}) {
  const { todaysQuestion } = opts;
  if (!todaysQuestion || !todaysQuestion?.uid) return null;

  const { fastestTimes } = await getFastestTimes({
    numberOfResults: 10,
    questionUid: todaysQuestion?.uid,
  });

  const top3FastestTimes = fastestTimes.slice(0, 3);
  const restOfFastestTimes = fastestTimes.slice(3, fastestTimes.length);

  if (fastestTimes.length === 0) {
    return (
      <Card className="bg-black border-none">
        <CardContent className="pt-6 px-6 text-center">
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

  return (
    <Card className="font-satoshi bg-black text-white border-none">
      <CardContent className="pt-6">
        <TopThreeLeaderboardBentoBox fastestTimes={top3FastestTimes} />

        {restOfFastestTimes.length > 0 && (
          <>
            <Separator className="my-4" />
            <div className="space-y-2">
              {restOfFastestTimes.map((time, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-1 px-2 rounded hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-white w-6">{i + 4}.</span>
                    <span className="font-medium text-white">
                      {getUserDisplayName(time.user)}
                    </span>
                  </div>
                  <span className="text-white font-satoshi">
                    {formatSeconds(time.timeTaken || 0)}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
