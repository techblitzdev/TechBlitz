import {
  getStatsChartData,
  getTotalQuestionCount,
  getTotalTimeTaken
} from '@/actions/statistics/get-stats-chart-data';
import QuestionChart from '@/components/statistics/total-question-chart';
import TotalStatsCard from '@/components/statistics/total-stats-card';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/loading';
import { useUserServer } from '@/hooks/useUserServer';
import { convertSecondsToTime, formatSeconds } from '@/utils/time';
import { Calendar } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function StatisticsPage() {
  const user = await useUserServer();

  if (!user) {
    return redirect('/login');
  }

  const [stats, totalQuestions, totalTimeTaken] = await Promise.all([
    getStatsChartData({
      userUid: user.uid,
      from: '2024-01-01',
      to: '2024-12-31'
    }),

    getTotalQuestionCount(user.uid),

    getTotalTimeTaken(user.uid)
  ]);

  return (
    <div>
      <div className="pt-14 pb-5 flex w-full justify-between items-center">
        <h1 className="text-3xl text-gradient from-white to-white/55">
          Statistics
        </h1>
        <div className="flex gap-3">
          <Button>
            <Calendar className="size-4 mr-2" />
            Date Range
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-8">
        {totalQuestions ? (
          <TotalStatsCard
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
        <div className="max-h-[28rem] col-span-12">
          {stats ? <QuestionChart questionData={stats} /> : <LoadingSpinner />}
        </div>
      </div>
      <pre>{JSON.stringify(stats, null, 2)}</pre>
    </div>
  );
}
