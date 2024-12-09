import { getStatsChartData } from '@/actions/statistics/get-stats-chart-data';
import QuestionChart from '@/components/statistics/total-question-chart';
import { Button } from '@/components/ui/button';
import { useUserServer } from '@/hooks/useUserServer';
import { Calendar } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function StatisticsPage() {
  const user = await useUserServer();

  if (!user) {
    return redirect('/login');
  }

  const stats = await getStatsChartData({
    userUid: user.uid,
    from: '2024-01-01',
    to: '2025-12-10'
  });

  // TODO: Handle error/null state
  if (!stats) {
    return null;
  }

  return (
    <div>
      <div className="pt-14 pb-5 flex w-full justify-between items-center">
        <h1 className="text-3xl text-gradient from-white to-white/55">
          Statistics
        </h1>
        <Button>
          <Calendar className="size-4 mr-2" />
          Jan 2024 - Jan 2025
        </Button>
      </div>
      <div className="max-h-[28rem]">
        <QuestionChart questionData={stats} />
      </div>
      <pre>{JSON.stringify(stats, null, 2)}</pre>
    </div>
  );
}
