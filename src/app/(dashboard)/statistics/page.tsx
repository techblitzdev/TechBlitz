import { getStatsChartData } from '@/actions/statistics/get-stats-chart-data';
import { useUserServer } from '@/hooks/useUserServer';
import { redirect } from 'next/navigation';

export default async function StatisticsPage() {
  const user = await useUserServer();

  if (!user) {
    return redirect('/login');
  }

  const stats = await getStatsChartData(user.uid);

  return (
    <div>
      <h1>Statistics</h1>
      <pre>{JSON.stringify(stats, null, 2)}</pre>
    </div>
  );
}
