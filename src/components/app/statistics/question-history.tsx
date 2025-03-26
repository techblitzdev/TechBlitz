import { formatDistanceToNow } from 'date-fns';
import { CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SPulse2 from '@/components/ui/icons/s-pulse-2';
import { cn } from '@/lib/utils';
import type { RecentUserAnswer } from '@/utils/data/answers/get-user-answer';

interface QuestionHistoryProps {
  className?: string;
  recentAnswers: RecentUserAnswer[];
}

export default async function QuestionHistory({ className, recentAnswers }: QuestionHistoryProps) {
  const answeredCount = recentAnswers.length;
  const correctCount = recentAnswers.filter((answer) => answer.correctAnswer).length;

  return (
    <Card className={cn('border-black-50 overflow-hidden bg-black-100', className)}>
      <CardHeader className="flex flex-row items-start gap-3 p-5 pb-0">
        <div className="rounded-lg bg-black-50 p-2">
          <SPulse2 fill="white" height="32" width="32" />
        </div>
        <div className="flex-1">
          <CardTitle className="flex flex-col gap-0.5">
            <span className="text-xs font-normal text-gray-400">Last 10 questions</span>
            <h4 className="text-xl font-semibold text-white">Question History</h4>
          </CardTitle>
        </div>
      </CardHeader>

      <CardDescription className="mt-1 text-xs text-gray-400 px-5 pt-2">
        In the last 7 days, you have answered {answeredCount} questions
        {answeredCount > 0 && ` with ${correctCount} correct answers`}.
        {answeredCount > 0 ? ' Great work!' : ' Start answering to track your progress.'}
      </CardDescription>

      <CardContent className="mt-5 p-0">
        {recentAnswers.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 p-8 text-center">
            <p className="text-sm text-gray-400">No recent questions found.</p>
            <Button
              variant="default"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              Start answering questions
            </Button>
          </div>
        ) : (
          <ul className="divide-y divide-black-50">
            {recentAnswers.map((answer) => (
              <li key={answer.uid} className="transition-colors hover:bg-black-50/50">
                <Link href={`/questions/${answer.question.slug}`} className="block p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'mt-0.5 flex-shrink-0 rounded-full p-1',
                        answer.correctAnswer ? 'bg-green-500/10' : 'bg-red-500/10'
                      )}
                    >
                      {answer.correctAnswer ? (
                        <CheckCircle className="size-4 text-green-500" />
                      ) : (
                        <XCircle className="size-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-2 w-full">
                      <h3 className="font-onest text-sm font-medium text-white line-clamp-2">
                        {answer.question.title || answer?.question?.question?.substring(0, 50)}
                      </h3>
                      <span className="flex-shrink-0 font-onest text-xs text-gray-400">
                        {formatDistanceToNow(new Date(answer.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
