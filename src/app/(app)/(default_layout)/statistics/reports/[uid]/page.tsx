import { getReport } from '@/actions/statistics/reports/get-report';

export default async function StatisticsReportPage({
  params,
}: {
  params: { uid: string };
}) {
  const { uid } = params;
  const report = await getReport(uid);

  return (
    <div>
      <h1>Report for {report?.createdAt.toLocaleDateString()}</h1>
    </div>
  );
}
