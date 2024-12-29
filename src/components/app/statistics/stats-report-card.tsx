import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { StatsReport } from '@/types/Stats';
import { timeAgo } from '@/utils/time';
import Chip from '@/components/ui/chip';

export default function StatsReportCard({ report }: { report: StatsReport }) {
  const totalTags = report.correctTags.length + report.incorrectTags.length;
  const correctPercentage = (report.correctTags.length / totalTags) * 100;

  return (
    <Link
      href={`/statistics/reports/${report.uid}`}
      className="group w-full h-auto hover:shadow-md transition-all duration-200"
    >
      <div className="space-y-4 border border-black-50 p-5 rounded-lg relative overflow-hidden">
        {/* Header */}
        <div className="flex w-full justify-between items-center">
          <h6 className="text-lg font-semibold">
            Report from {timeAgo(report.createdAt)}
          </h6>
          <MoreHorizontal className="size-5 text-gray-500" />
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex gap-2 items-center">
            <p className="text-xs">Accuracy:</p>
            <p className="text-xs text-muted-foreground">
              {correctPercentage.toFixed(1)}% correct
            </p>
          </div>

          <div className="h-2 w-full rounded-full bg-secondary">
            <div
              className="h-2 rounded-full bg-green-500"
              style={{ width: `${correctPercentage}%` }}
            />
          </div>
        </div>
        {/* Stats Grid */}
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
      </div>
    </Link>
  );
}
