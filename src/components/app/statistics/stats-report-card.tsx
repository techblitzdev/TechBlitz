import { StatisticsReport } from '@prisma/client';
import Link from 'next/link';

export default function StatsReportCard({
  report,
}: {
  report: StatisticsReport;
}) {
  return (
    <Link
      href={`/statistics/reports/${report.uid}`}
      className="space-y-5 items-start border border-black-50 p-5 rounded-lg group w-full h-auto flex flex-col relative overflow-hidden"
    >
      <h6 className="text-base text-wrap text-start">
        Report for {new Date(report.createdAt).toLocaleDateString()}
      </h6>
    </Link>
  );
}
