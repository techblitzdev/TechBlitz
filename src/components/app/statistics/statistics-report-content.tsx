'use client';

import React, { useMemo } from 'react';
import { redirect } from 'next/navigation';
import { format } from 'date-fns';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useUser } from '@/hooks/useUser';
import { getUserDisplayName } from '@/utils/user';
import { StatisticsReport } from '@prisma/client';

import { Question } from '@/types/Questions';
import StatisticsReportTabs from './statistics-report-tabs';
import NumberFlow from '@number-flow/react';
import BackToDashboard from '@/components/ui/back-to-dashboard';

const MemoizedNumberFlow = React.memo(NumberFlow);

export default function StatisticsReportContent({
  report,
}: {
  report: StatisticsReport & { questions: Question[] };
}) {
  const { user, isLoading } = useUser();

  if (!user && !isLoading) {
    redirect('/login');
  }

  const stats = useMemo(() => {
    const totalQuestions =
      report.correctTags.length + report.incorrectTags.length;
    const correctPercentage =
      (report.correctTags.length / totalQuestions) * 100;

    return {
      totalQuestions,
      correctAnswers: report.correctTags.length,
      incorrectAnswers: report.incorrectTags.length,
      accuracy: correctPercentage.toFixed(1),
    };
  }, [report]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-6 mb-6">
        <BackToDashboard href="/statistics" />
        <h1 className="text-3xl font-bold text-gradient from-white/55 to-white">
          Statistics Report
        </h1>
      </div>
      <Card className="mb-8 border-black-50">
        <CardHeader>
          <CardTitle className="text-white">Report Summary</CardTitle>
          <CardDescription className="text-gray-400">
            Created on {format(report.createdAt, 'MMMM d, yyyy')} at{' '}
            {format(report.createdAt, 'h:mm a')}, for{' '}
            {user && getUserDisplayName(user)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-semibold text-white">
                <MemoizedNumberFlow value={stats.totalQuestions} />
              </p>
              <p className="text-sm text-muted-foreground">Total Questions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-white">
                <MemoizedNumberFlow value={stats.correctAnswers} />
              </p>
              <p className="text-sm text-muted-foreground">Correct Answers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-white">
                <MemoizedNumberFlow value={stats.incorrectAnswers} />
              </p>
              <p className="text-sm text-muted-foreground">Incorrect Answers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-white">
                <MemoizedNumberFlow value={Number(stats.accuracy)} suffix="%" />
              </p>
              <p className="text-sm text-muted-foreground">Accuracy</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <StatisticsReportTabs report={report} />
    </div>
  );
}
