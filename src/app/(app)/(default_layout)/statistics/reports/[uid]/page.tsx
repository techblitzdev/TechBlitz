import { getReport } from '@/actions/statistics/reports/get-report';
import StatisticsReportContent from '@/components/app/statistics/statistics-report-content';

export default async function StatisticsReportPage({
  params,
}: {
  params: { uid: string };
}) {
  const { uid } = params;
  const report = await getReport(uid);

  if (!report) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
          Report not found
        </h1>
      </div>
    );
  }

  return <StatisticsReportContent report={report} />;
}
