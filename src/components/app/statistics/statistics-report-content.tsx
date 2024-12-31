'use client';

import React, { useState, useMemo } from 'react';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { format } from 'date-fns';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import NumberFlow from '@number-flow/react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { useUser } from '@/hooks/useUser';
import { getUserDisplayName } from '@/utils/user';
import { StatisticsReport } from '@prisma/client';

import { Question } from '@/types/Questions';
import QuestionSuggestedCard from '@/components/app/questions/suggested-questions-table';
import { getSuggestions } from '@/actions/questions/get-suggestions';
import { useQuery } from '@tanstack/react-query';
import { capitalise } from '@/utils';

const MemoizedNumberFlow = React.memo(NumberFlow);

export default function StatisticsReportContent({
  report,
}: {
  report: StatisticsReport & { questions: Question[] };
}) {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!user && !isLoading) {
    redirect('/login');
  }

  const [activeTab, setActiveTab] = useState<'tags' | 'details' | 'questions'>(
    () =>
      (searchParams.get('tab') as 'tags' | 'details' | 'questions') ||
      'questions'
  );

  const stats = useMemo(() => {
    const totalQuestions =
      report.correctTags.length + report.incorrectTags.length;
    const correctPercentage =
      (report.correctTags.length / totalQuestions) * 100;

    return {
      totalQuestions,
      correctAnswers: report.correctTags.length,
      incorrectAnswers: report.incorrectTags.length,
      accuracy: correctPercentage,
    };
  }, [report]);

  const { data: suggestions, isLoading: isLoadingSuggestions } = useQuery({
    queryKey: ['suggested-questions'],
    queryFn: () => getSuggestions({ userUid: user?.uid ?? '', limit: 8 }),
  });

  const handleTabChange = (value: string) => {
    const newTab = value as 'tags' | 'details' | 'questions';
    setActiveTab(newTab);
    router.push(`?tab=${newTab}`, { scroll: false });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gradient from-white/55 to-white">
        Statistics Report
      </h1>
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
                <MemoizedNumberFlow value={stats.accuracy} suffix="%" />
              </p>
              <p className="text-sm text-muted-foreground">Accuracy</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-3 text-white bg-[#000]">
          <TabsTrigger value="details">Detailed Report</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
        </TabsList>
        <TabsContent value="tags">
          <Card className="border-black-50">
            <CardHeader>
              <CardTitle className="text-white text-center text-xl">
                Tags Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-3 text-white flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                    Correct Tags
                  </h3>
                  <ScrollArea className="h-40">
                    <div className="flex flex-wrap gap-2">
                      {report.correctTags.map((tag, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          className="p-0"
                          href={`/questions/all?tag=${tag}`}
                        >
                          <Badge
                            variant="secondary"
                            className="bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30 transition-colors"
                          >
                            {capitalise(tag)}
                          </Badge>
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-3 text-white flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
                    Incorrect Tags
                  </h3>
                  <ScrollArea className="h-40">
                    <div className="flex flex-wrap gap-2">
                      {report.incorrectTags.map((tag, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          className="p-0"
                          href={`/questions/all?tag=${tag}`}
                        >
                          <Badge
                            variant="secondary"
                            className="bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 transition-colors"
                          >
                            {capitalise(tag)}
                          </Badge>
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="details">
          <Card className="border-black-50">
            <CardHeader>
              <CardTitle className="text-white text-center text-xl">
                Detailed Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div
                  className="prose dark:prose-invert max-w-none text-white [&>div]:space-y-2"
                  dangerouslySetInnerHTML={{
                    __html:
                      report.htmlReport || 'No detailed report available.',
                  }}
                />
                <div className="flex flex-col gap-y-2 mt-6 text-white">
                  Why not check out the custom questions we have created for you
                  based on this report?
                  <Button onClick={() => handleTabChange('questions')}>
                    View Questions
                  </Button>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="questions">
          <Card className="border-black-50">
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 pt-6">
              <div className="flex flex-col gap-y-4 text-center text-white">
                <div className="flex flex-col gap-y-2">
                  <h3 className="text-lg font-semibold">Suggested Questions</h3>
                  <p className="text-sm text-gray-400">
                    These questions have been suggested based on this report.
                  </p>
                </div>

                {isLoadingSuggestions ? (
                  <div className="space-y-4">
                    {[...Array(8)].map((_, index) => (
                      <Skeleton
                        key={index}
                        className="h-8 w-full bg-black-50"
                      />
                    ))}
                  </div>
                ) : (
                  <QuestionSuggestedCard
                    questions={suggestions ?? []}
                    textLimit={75}
                  />
                )}
              </div>
              <div className="flex flex-col gap-y-4 text-center text-white">
                <div className="flex flex-col gap-y-2">
                  <h3 className="text-lg font-semibold">Custom Questions</h3>
                  <p className="text-sm text-gray-400">
                    These questions have been created based on the report.
                  </p>
                </div>

                <QuestionSuggestedCard
                  questions={report.questions ?? []}
                  textLimit={75}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
