import { generateStatisticsReport } from "@/actions/ai/reports/generate-report";
import { getUserReports } from "@/utils/data/statistics/reports/get-reports";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUserServer } from "@/hooks/use-user-server";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { StatisticsReport as StatisticsReportType } from "@prisma/client";

export default async function StatisticsReport() {
  const user = await useUserServer();

  let reports: StatisticsReportType[] = [];

  // get all reports
  if (user?.userLevel !== "FREE") {
    reports = await getUserReports();
  }

  return (
    <section
      className="
            col-span-full lg:col-span-6 border border-black-50 rounded-lg flex flex-col overflow-hidden
        "
    >
      <div className="flex flex-col gap-2.5 px-3 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-onest">Statistics Review</h2>
          <Button
            variant="secondary"
            className="flex items-center gap-x-2 text-sm"
            href="/statistics/reports"
            disabled={reports.length === 0 || user?.userLevel === "FREE"}
          >
            Reports overview
            <ChevronRight className="size-4" />
          </Button>
        </div>
        <p className="text-sm text-gray-400">
          A personalized, in-depth analysis of your current coding ability.
        </p>
      </div>
      <Separator className="bg-black-50" />
      <div className="flex flex-col divide-y-[1px] divide-black-50">
        {reports.length > 0 &&
          reports.map((report, index) => (
            <Link
              key={report.uid}
              className={cn(
                "p-3 truncate w-full flex justify-between items-center group",
                index % 2 === 0
                  ? "bg-[#000] hover:bg-black-100"
                  : "bg-black hover:bg-black-75",
              )}
              href={`/statistics/reports/${report.uid}`}
            >
              <p className="text-sm font-satoshi line-clamp-1">
                Report for {report.createdAt?.toLocaleDateString()}
              </p>
              <ArrowRight className="size-3 mr-1 group-hover:mr-0 duration-300 flex-shrink-0" />
            </Link>
          ))}
      </div>
      {user?.userLevel === "FREE" && (
        <div className="px-3 py-4 h-full flex flex-col gap-y-2 items-center justify-center">
          <p className="text-sm text-gray-400">
            You need to be a premium user to generate a report.
          </p>
          <Button
            href="https://dub.sh/upgrade-techblitz"
            variant="secondary"
            className="flex items-center gap-x-2"
          >
            Upgrade to Premium
            <ArrowRight className="size-4" />
          </Button>
        </div>
      )}
      {reports.length === 0 && user?.userLevel !== "FREE" && (
        <form
          className="px-3 py-4 h-full flex items-center justify-center"
          action={generateStatisticsReport}
        >
          <Button variant="secondary" className="flex items-center gap-x-2">
            Generate Report
          </Button>
        </form>
      )}
    </section>
  );
}
