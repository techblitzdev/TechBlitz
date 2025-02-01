import { getUserReports } from '@/utils/data/statistics/reports/get-reports';
import StatsReportCard from './stats-report-card';

export default async function StatsReportCardsWrapper() {
  const reports = await getUserReports();

  return (
    <>
      {reports.length > 0 &&
        reports.map((report) => <StatsReportCard key={report.uid} report={report} />)}
      {reports.length === 0 && <p className="text-lg text-muted-foreground">No reports found.</p>}
    </>
  );
}
