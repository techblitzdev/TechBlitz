import { Suspense } from 'react';
import { getUserReports } from '@/actions/ai/reports/get-reports';

import StatsReportCard from '@/components/app/statistics/stats-report-card';
import Hero from '@/components/global/hero';
import { Button } from '@/components/ui/button';
import { generateStatisticsReport } from '@/actions/ai/reports/generate-report';
import StatsReportCardSkeleton from '@/components/app/statistics/stats-report-card-loading';

export default async function StatisticsReportsPage() {
  const reports = await getUserReports();

  return (
    <>
      <Hero
        heading="Reports"
        subheading="You can view the accuracy of your questions and the questions you've answered. We have also generated personalized questions to help you improve your skills."
      />
      <div className="md:container flex flex-col lg:flex-row mt-5 gap-16">
        <div className="w-full lg:w-[55%] flex flex-col gap-6">
          <Suspense
            fallback={
              <>
                {[...Array(6)].map((_, i) => (
                  <StatsReportCardSkeleton key={i} />
                ))}
              </>
            }
          >
            {reports.map((report) => (
              <StatsReportCard key={report.uid} report={report} />
            ))}
          </Suspense>
        </div>
        <aside className="w-full lg:w-[45%] relative">
          <form action={generateStatisticsReport}>
            <Button variant="accent">Generate Report</Button>
          </form>
        </aside>
      </div>
    </>
  );
}
