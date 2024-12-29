import { Suspense } from 'react';
import { getUserReports } from '@/actions/ai/reports/get-reports';
import LoadingSpinner from '@/components/ui/loading';
import StatsReportCard from '@/components/app/statistics/stats-report-card';
import Hero from '@/components/global/hero';
import { Button } from '@/components/ui/button';

export default async function StatisticsReportsPage() {
  const reports = await getUserReports();

  return (
    <>
      <Hero
        heading="Reports"
        subheading="A detailed overview of your coding journey."
      />
      <div className="md:container flex flex-col lg:flex-row mt-5 gap-16">
        <div className="w-full lg:w-[55%] space-y-6">
          <Suspense fallback={<LoadingSpinner />}>
            {reports.map((report) => (
              <StatsReportCard key={report.uid} report={report} />
            ))}
          </Suspense>
        </div>
        <aside className="w-full lg:w-[45%] relative">
          <Button variant="accent">Generate Report</Button>
        </aside>
      </div>
    </>
  );
}
