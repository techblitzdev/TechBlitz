import React from 'react';
import { MoreHorizontal, CheckCircle, XCircle, FileText } from 'lucide-react';
import Link from 'next/link';
import { StatsReport } from '@/types/Stats';

export default function StatsReportCard({ report }: { report: StatsReport }) {
  // Calculate time difference
  const timeAgo = () => {
    const now = new Date();
    const created = new Date(report.createdAt);
    const diff = now.getTime() - created.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return created.toLocaleDateString();
  };

  return (
    <Link
      href={`/statistics/reports/${report.uid}`}
      className="group w-full h-auto hover:shadow-md transition-all duration-200"
    >
      <div className="space-y-4 border border-black-50 p-5 rounded-lg relative overflow-hidden">
        {/* Header */}
        <div className="flex w-full justify-between items-center">
          <h6 className="text-lg font-semibold">Report from {timeAgo()}</h6>
          <MoreHorizontal className="size-5 text-gray-500" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 py-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="size-4 text-green-500" />
            <span className="text-sm">
              {report.correctTags.length} Correct Tags
            </span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="size-4 text-red-500" />
            <span className="text-sm">
              {report.incorrectTags.length} Incorrect Tags
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-blue-500" />
            <span className="text-sm">
              {report.questions.length} Custom questions
            </span>
          </div>
        </div>

        {/* Progress Bar 
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(report.correctTags.length / (report.correctTags.length + report.incorrectTags.length)) * 100}%`,
            }}
          />
        </div>
        */}
      </div>
    </Link>
  );
}
