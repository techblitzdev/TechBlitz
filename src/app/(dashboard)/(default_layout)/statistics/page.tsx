import {
  getStatsChartData,
  getTotalQuestionCount,
  getTotalTimeTaken,
  getHighestScoringTag
} from '@/actions/statistics/get-stats-chart-data';
import StatsRangePicker from '@/components/statistics/range-picker';
import QuestionChart from '@/components/statistics/total-question-chart';
import TotalStatsCard from '@/components/statistics/total-stats-card';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/loading';
import { Separator } from '@/components/ui/separator';
import { useUserServer } from '@/hooks/useUserServer';
import { formatSeconds } from '@/utils/time';
import { Calendar, Stars } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function StatisticsPage() {
  const user = await useUserServer();

  if (!user) {
    return redirect('/login');
  }

  const [stats, totalQuestions, totalTimeTaken, highestScoringTag] =
    await Promise.all([
      getStatsChartData({
        userUid: user.uid,
        from: '2024-01-01',
        to: '2024-12-31',
        step: 'day'
      }),
      getTotalQuestionCount(user.uid),
      getTotalTimeTaken(user.uid),
      getHighestScoringTag(user.uid)
    ]);

  return (
    <div>
      <div className="pt-14 pb-5 flex w-full justify-between items-center">
        <h1 className="text-3xl text-gradient from-white to-white/55">
          Statistics
        </h1>
        <div className="flex gap-3">
          <StatsRangePicker />
          <Button variant="default">
            <Stars className="size-4 text-yellow-300 fill-yellow-300" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-y-4 gap-x-8">
        {totalQuestions ? (
          <TotalStatsCard
            className="-left-3 relative"
            header={Number(totalQuestions)}
            description="Total Questions Answered"
          />
        ) : (
          <LoadingSpinner />
        )}
        {totalTimeTaken ? (
          <TotalStatsCard
            header={formatSeconds(totalTimeTaken, true)}
            description="Total Time Answering"
          />
        ) : (
          <LoadingSpinner />
        )}
        {highestScoringTag ? (
          <TotalStatsCard
            header={highestScoringTag.tag}
            description={`Highest Scoring Tag (${highestScoringTag.count})`}
          />
        ) : (
          <LoadingSpinner />
        )}
        <div className="max-h-[28rem] col-span-12">
          {stats ? <QuestionChart questionData={stats} /> : <LoadingSpinner />}
        </div>
      </div>
      <pre>{JSON.stringify(stats, null, 2)}</pre>
    </div>
  );
}
