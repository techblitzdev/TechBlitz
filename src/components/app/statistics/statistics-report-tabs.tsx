import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import QuestionSuggestedCard from '@/components/app/questions/suggested-questions-table';
import { Badge } from '@/components/ui/badge';

import { capitalise } from '@/utils';
import { StatisticsReport } from '@prisma/client';
import type { Question } from '@/types';
import { useUserServer } from '@/hooks/use-user-server';

export default async function StatisticsReportTabs(opts: {
  report: StatisticsReport & { questions: Question[] };
}) {
  const { report } = opts;

  const user = await useUserServer();

  if (!user) {
    return redirect('/login');
  }

  return (
    <Tabs defaultValue="questions">
      <TabsList className="grid w-full grid-cols-3 text-white bg-[#000]">
        <TabsTrigger value="details">Detailed Report</TabsTrigger>
        <TabsTrigger value="questions">Questions</TabsTrigger>
        <TabsTrigger value="tags">Tags</TabsTrigger>
      </TabsList>
      <TabsContent value="tags">
        <Card className="border-black-50">
          <CardHeader>
            <CardTitle className="text-white text-center text-xl">Tags Overview</CardTitle>
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
                        href={`/questions?tags=${tag}`}
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
                        href={`/questions?tags=${tag}`}
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
            <CardTitle className="text-white text-center text-xl">Detailed Report</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="prose max-w-none text-white [&>div]:space-y-2">
                {(() => {
                  // test if the report is json
                  if (typeof report.htmlReport === 'object' && report.htmlReport !== null) {
                    return (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: report.htmlReport,
                        }}
                      />
                    );
                  }

                  const reportData = JSON?.parse(report?.htmlReport || '{}');
                  return (
                    <>
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2 underline">Brief Summary</h3>
                        <p className="text-gray-400 font-onest">{reportData.briefSummary}</p>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2 underline">
                          Performance Overview
                        </h3>
                        <p className="text-gray-400 font-onest">{reportData.userPerformance}</p>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2 underline">Strengths</h3>
                        <ul className="list-disc pl-6 text-green-300 font-onest">
                          {reportData.strengths.map((strength: string, index: number) => (
                            <li key={index}>{strength}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2 underline">
                          Areas for Improvement
                        </h3>
                        <ul className="list-disc pl-6 text-red-300 font-onest">
                          {reportData.weaknesses.map((weakness: string, index: number) => (
                            <li key={index}>{weakness}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2 underline">Suggestions</h3>
                        <ul className="list-disc pl-6 text-blue-300 font-onest">
                          {reportData.suggestions.map((suggestion: string, index: number) => (
                            <li key={index}>{suggestion}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-2 underline">Focus Areas</h3>
                        <ul className="list-disc pl-6 text-purple-300 font-onest">
                          {reportData.topicsToFocusOn.map((topic: string, index: number) => (
                            <li key={index}>{topic}</li>
                          ))}
                        </ul>
                      </div>
                    </>
                  );
                })()}
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

              <QuestionSuggestedCard />
            </div>
            <div className="flex flex-col gap-y-4 text-center text-white">
              <div className="flex flex-col gap-y-2">
                <h3 className="text-lg font-semibold">Custom Questions</h3>
                <p className="text-sm text-gray-400">
                  These questions have been created based on the report.
                </p>
              </div>

              <QuestionSuggestedCard customQuestions={report.questions ?? []} isCustomQuestion />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
