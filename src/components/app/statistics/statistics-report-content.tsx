'use client';

import { useState, useEffect, Suspense } from 'react';
import { redirect } from 'next/navigation';

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

import { useUser } from '@/hooks/useUser';
import { getUserDisplayName } from '@/utils/user';
import { StatisticsReport } from '@prisma/client';

import { Question } from '@/types/Questions';
import QuestionSuggestedCard from '@/components/app/questions/suggested-questions-table';
import { getSuggestions } from '@/actions/questions/get-suggestions';
import { useQuery } from '@tanstack/react-query';

export default function StatisticsReportContent({
  report,
}: {
  report: StatisticsReport & { questions: Question[] };
}) {
  const { user, isLoading } = useUser();
  if (!user && !isLoading) {
    redirect('/login');
  }

  const [activeTab, setActiveTab] = useState<
    'summary' | 'details' | 'questions'
  >('summary');
  const [stats, setStats] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    accuracy: 0,
  });

  useEffect(() => {
    const totalQuestions =
      report.correctTags.length + report.incorrectTags.length;
    const correctPercentage =
      (report.correctTags.length / totalQuestions) * 100;

    setStats({
      totalQuestions: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      accuracy: 0,
    });

    setTimeout(() => {
      setStats({
        totalQuestions,
        correctAnswers: report.correctTags.length,
        incorrectAnswers: report.incorrectTags.length,
        accuracy: correctPercentage,
      });
    }, 100);
  }, [report]);

  // get the suggested questions. We have to use useQuery here due
  // to the fact that the component we pass the suggestions to is a
  // server component.
  const { data: suggestions, isLoading: isLoadingSuggestions } = useQuery({
    queryKey: ['suggested-questions'],
    queryFn: () => getSuggestions({ userUid: user?.uid ?? '', limit: 8 }),
  });

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
                <NumberFlow value={stats.totalQuestions} />
              </p>
              <p className="text-sm text-muted-foreground">Total Questions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-white">
                <NumberFlow value={stats.correctAnswers} />
              </p>
              <p className="text-sm text-muted-foreground">Correct Answers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-white">
                <NumberFlow value={stats.incorrectAnswers} />
              </p>
              <p className="text-sm text-muted-foreground">Incorrect Answers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-white">
                <NumberFlow value={stats.accuracy} suffix="%" />
              </p>
              <p className="text-sm text-muted-foreground">Accuracy</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs
        value={activeTab}
        onValueChange={(value) =>
          setActiveTab(value as 'summary' | 'details' | 'questions')
        }
      >
        <TabsList className="grid w-full grid-cols-3 text-white bg-[#000]">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="details">Detailed Report</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
        </TabsList>
        <TabsContent value="summary">
          <Card className="border-black-50">
            <CardHeader>
              <CardTitle className="text-white">Tags Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    Correct Tags
                  </h3>
                  <ScrollArea className="h-32">
                    <div className="flex flex-wrap gap-2">
                      {report.correctTags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-green-100 text-green-800"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    Incorrect Tags
                  </h3>
                  <ScrollArea className="h-32">
                    <div className="flex flex-wrap gap-2">
                      {report.incorrectTags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-red-100 text-red-800"
                        >
                          {tag}
                        </Badge>
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
              <CardTitle className="text-white">Detailed Report</CardTitle>
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
                  <Button onClick={() => setActiveTab('questions')}>
                    View Questions
                  </Button>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="questions">
          <Card className="border-black-50">
            {/** a 2 x 2 grid of suggested questions and custom questions */}
            <CardContent className="grid grid-cols-2 gap-4 pt-6">
              <div className="flex flex-col gap-y-4 text-center text-white">
                <div className="">
                  <h3 className="text-lg font-semibold mb-2 ">
                    Suggested Questions
                  </h3>
                  <p className="text-sm text-gray-400">
                    These questions have been suggested based on this report.
                  </p>
                </div>

                <QuestionSuggestedCard questions={suggestions ?? []} />
              </div>
              <div className="flex flex-col gap-y-4 text-center text-white">
                <div className="">
                  <h3 className="text-lg font-semibold mb-2">
                    Custom Questions
                  </h3>
                  <p className="text-sm text-gray-400">
                    These questions have been created based on the report.
                  </p>
                </div>
                <QuestionSuggestedCard questions={report.questions ?? []} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
