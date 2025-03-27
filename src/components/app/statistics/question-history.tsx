import { formatDistanceToNow } from 'date-fns';
import { CheckCircle, Ellipsis, XCircle, Clock, Calendar, BarChart3, Info } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SPulse2 from '@/components/ui/icons/s-pulse-2';
import { cn } from '@/lib/utils';
import type { RecentUserAnswer } from '@/utils/data/answers/get-user-answer';

// Extend the RecentUserAnswer interface with additional properties we need
interface ExtendedRecentUserAnswer extends RecentUserAnswer {
  timeTaken?: number;
  question: {
    title: string | null;
    slug: string | null;
    question: string | null;
    difficulty?: string;
  };
}

interface QuestionHistoryProps {
  className?: string;
  recentAnswers: ExtendedRecentUserAnswer[];
  dropdownPosition?: 'left' | 'right';
}

// Format time taken in a more readable format
const formatTimeTaken = (seconds: number | null | undefined) => {
  if (!seconds) return 'N/A';

  if (seconds < 60) {
    return `${seconds} seconds`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}m ${remainingSeconds}s`;
};

function QuestionDetailDropdown({
  answer,
  position,
}: {
  answer: ExtendedRecentUserAnswer;
  position: 'left' | 'right';
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-7 w-7 p-0 ml-1 rounded-full bg-black-50/50 hover:bg-black-50"
        >
          <Info className="h-4 w-4 text-gray-400" />
          <span className="sr-only">Show details</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={position === 'left' ? 'start' : 'end'}
        className="bg-black-50 border-black-50/80 p-3 w-64"
      >
        <h4 className="text-sm font-medium text-white mb-2">Question Details</h4>
        <div className="space-y-1.5">
          <div className="flex items-center text-xs text-gray-300">
            <Clock className="mr-2 size-3.5 text-gray-400" />
            <span>Time taken: {formatTimeTaken(answer.timeTaken)}</span>
          </div>
          <div className="flex items-center text-xs text-gray-300">
            <Calendar className="mr-2 size-3.5 text-gray-400" />
            <span>Date: {format(new Date(answer.createdAt), 'MMM d, yyyy h:mm a')}</span>
          </div>
          <div className="flex items-center text-xs text-gray-300">
            <BarChart3 className="mr-2 size-3.5 text-gray-400" />
            <span>Difficulty: {answer.question.difficulty || 'N/A'}</span>
          </div>
          <div className="mt-2 pt-2 border-t border-black-50/80">
            <div className="flex items-center">
              <div
                className={cn(
                  'mr-2 rounded-full p-1',
                  answer.correctAnswer ? 'bg-green-500/10' : 'bg-red-500/10'
                )}
              >
                {answer.correctAnswer ? (
                  <CheckCircle className="size-3 text-green-500" />
                ) : (
                  <XCircle className="size-3 text-red-500" />
                )}
              </div>
              <span className="text-xs text-gray-300">
                {answer.correctAnswer ? 'Correct answer' : 'Incorrect answer'}
              </span>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function QuestionItem({
  answer,
  dropdownPosition,
}: {
  answer: ExtendedRecentUserAnswer;
  dropdownPosition: 'left' | 'right';
}) {
  return (
    <li className="relative transition-colors hover:bg-black-50/50">
      <div className="flex items-start px-4 py-3">
        <div className="flex flex-1 items-center gap-3">
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
            <div className="flex-1">
              <Link
                href={`/questions/${answer.question.slug}`}
                className="block font-onest text-sm font-medium text-white line-clamp-2 hover:underline"
              >
                {answer.question.title || answer?.question?.question?.substring(0, 50)}
              </Link>
              <span className="text-xs text-gray-400">
                {formatDistanceToNow(new Date(answer.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <QuestionDetailDropdown answer={answer} position={dropdownPosition} />
          </div>
        </div>
      </div>
    </li>
  );
}

export default function QuestionHistory({
  className,
  recentAnswers,
  dropdownPosition = 'right',
}: QuestionHistoryProps) {
  const answeredCount = recentAnswers.length;
  const correctCount = recentAnswers.filter((answer) => answer.correctAnswer).length;

  return (
    <Card className={cn('border-black-50 overflow-hidden', className)}>
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
        <Button variant="ghost" size="icon">
          <Ellipsis className="size-4 text-gray-400" />
        </Button>
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
              <QuestionItem key={answer.uid} answer={answer} dropdownPosition={dropdownPosition} />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
