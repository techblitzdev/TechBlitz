'use client';
import { useQuery } from '@tanstack/react-query';
import { getQuestion } from '@/actions/questions/get';
import LoadingSpinner from '@/components/ui/loading';
import { useUser } from '@/hooks/useUser';
import AnswerQuestionForm from '@/components/questions/answer-question-form';
import { Separator } from '@/components/ui/separator';
import { BreadcrumbWithCustomSeparator } from '@/components/global/breadcrumbs';
import { useStopwatch } from 'react-timer-hook';
import NoDailyQuestion from '@/components/global/errors/no-daily-question';
import QuestionDisplay from '@/components/questions/code-snippet';
import { ArrowRight, ChevronRight, Clock } from 'lucide-react';
import BackToDashboard from '@/components/global/back-to-dashboard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Chip from '@/components/global/chip';
import { capitalise, getQuestionDifficultyColor } from '@/utils';
import TagDisplay from '@/components/questions/previous/tag-display';

const items = [
  {
    href: '/dashboard',
    label: 'Home',
  },
  {
    href: '/questions',
    label: 'Questions',
  },
  {
    href: '',
    label: 'Daily Question',
  },
];

export default function TodaysQuestionPage({
  params,
}: {
  params: { uid: string };
}) {
  const { uid } = params;
  const { user, isLoading: userLoading, isError: userError } = useUser();

  const {
    data: question,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['question', uid],
    queryFn: () => getQuestion(uid),
  });

  const { seconds, minutes, pause, reset, totalSeconds } = useStopwatch({
    autoStart: user?.showTimeTaken || false,
  });

  if (!question && !isPending) {
    return <NoDailyQuestion textAlign="center" />;
  }

  if (userLoading || isPending) {
    return (
      <div className="flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (userError || isError || !user?.uid) {
    return <span>Error loading: {error?.message}</span>;
  }

  if (!question) {
    return <span>Question not found</span>;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-5 py-2">
          {/** Previous question button */}
          <BackToDashboard />
          {question?.dailyQuestion && question?.questionDate && (
            <div className="font-ubuntu flex gap-x-5 items-center">
              <p>Daily question</p>
              <span>|</span>
              {new Date(question?.questionDate).toLocaleDateString()}
            </div>
          )}
        </div>
        <Link
          href="/dashboard"
          className="bg-black-100 border border-black-50 p-2 rounded-md relative group duration-200 size-8 flex items-center justify-center"
        >
          <ChevronRight className="size-4 opacity-100 group-hover:opacity-0 absolute duration-100" />
          <ArrowRight className="size-4 opacity-0 group-hover:opacity-100 absolute duration-100" />
        </Link>
      </div>
      <Separator className="bg-black-50" />

      <div className="grid grid-cols-12 gap-8 mt-6">
        <div className="flex flex-col gap-y-4 col-span-full lg:col-span-6 relative overflow-hidden">
          <Button className="border border-black-50">Question</Button>
          {/** answers */}
          <div className="col-span-full lg:col-span-6 h-full bg-black-75 border border-black-50 rounded-xl overflow-hidden">
            <div className="p-4">
              <Chip
                color={getQuestionDifficultyColor(question.difficulty)}
                text={capitalise(question.difficulty)}
                textColor={getQuestionDifficultyColor(question.difficulty)}
                ghost
              />
            </div>
            <Separator className="bg-black-50" />
            <div className="h-96"></div>
            <div className="absolute w-full bottom-0">
              {question?.tags && (
                <>
                  <Separator className="bg-black-50" />
                  <div className="p-4">
                    <TagDisplay tags={question.tags} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-full lg:col-span-6 h-3/4 grid-cols-subgrid gap-8 flex flex-col">
          {/** code snippet */}
          <div className="min-h-fit col-span-full row-start-1 bg-black-75 border border-black-50 rounded-xl relative overflow-hidden">
            <div className="px-4 py-2 text-sm">Code</div>
            <Separator className="bg-black-50" />
            {question?.codeSnippet && (
              <QuestionDisplay content={question.codeSnippet} language="" />
            )}
          </div>

          {/** hints + question stats */}
          <div className="h-1/2 col-span-full row-start-2 bg-black-75 border border-black-50 rounded-xl">
            <div className="px-4 py-2 text-sm">Stats</div>
            <Separator className="bg-black-50" />
            <div className="h-64"></div>
          </div>

          <div className="flex items-center gap-4 self-end">
            <Button variant="destructive">Reset</Button>
            <Button variant="secondary">Submit</Button>
          </div>
        </div>
      </div>
    </>
  );
}
