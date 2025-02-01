import Link from "next/link";

import { timeAgo } from "@/utils/time";
import { StatsReport } from "@/types/Stats";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import StatsReportCardMenu from "@/components/app/statistics/stats-report-card-menu";

export default async function StatsReportCard({
  report,
}: {
  report: StatsReport;
}) {
  const totalTags = report.correctTags.length + report.incorrectTags.length;
  const correctPercentage = (report.correctTags.length / totalTags) * 100;

  return (
    <Link
      href={`/statistics/reports/${report.uid}`}
      className="group w-full h-auto transition-all duration-200"
    >
      <div className="space-y-4 border border-black-50 hover:border-accent duration-300 p-5 rounded-lg relative overflow-hidden">
        {/* Header */}
        <div className="flex w-full justify-between items-center">
          <h6 className="text-lg font-semibold">
            Report from {timeAgo(report.createdAt)}
          </h6>
          <StatsReportCardMenu reportUid={report.uid} />
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex gap-2 items-center">
            <p className="text-xs font-ubuntu">Question accuracy:</p>
            <p className="text-xs text-muted-foreground font-ubuntu">
              {correctPercentage.toFixed(1)}% correct
            </p>
            <TooltipProvider delayDuration={0} skipDelayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild className="w-fit">
                  <QuestionMarkCircledIcon className="size-3 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent align="center">
                  <p>
                    This is the percentage of the total questions that you have
                    answered correctly.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="h-2 w-full rounded-full bg-secondary">
            <div
              className="h-2 rounded-full bg-green-500"
              style={{ width: `${correctPercentage}%` }}
            />
          </div>
        </div>
        {/* Stats Grid 
        <div className="w-full flex justify-between">
          <div className="flex gap-2">
            <Chip
              text={`${report.correctTags.length} Correct Tags`}
              color="green-500"
              textColor="green-500"
              ghost
              bold
            />
            <Chip
              text={`${report.incorrectTags.length} Incorrect Tags`}
              color="red-500"
              textColor="red-500"
              ghost
              bold
            />
          </div>
          <div className="w-fit">
            <Chip
              text={`${report.questions.length} Custom questions`}
              color="black-100"
              border="black-50"
              ghost
              bold
            />
          </div>
        </div>
        */}
      </div>
    </Link>
  );
}
