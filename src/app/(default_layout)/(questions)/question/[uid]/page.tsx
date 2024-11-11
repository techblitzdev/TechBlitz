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
import { Clock } from 'lucide-react';

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
    return <NoDailyQuestion />;
  }

  if (userLoading || isPending) {
    return (
      <div className="flex justify-center items-center navbar-height">
        <LoadingSpinner />
      </div>
    );
  }

  if (userError || isError || !user?.uid) {
    return <span>Error loading: {error?.message}</span>;
  }

  return (
    <>
      <div className="flex w-full justify-between items-center font-satoshi">
        <div className="flex flex-col gap-y-2 w-full">
          <BreadcrumbWithCustomSeparator items={items} />
          <div className="flex items-center justify-between w-full">
            <h1 className="text-xl md:text-3xl font-semibold">
              {question?.question}
            </h1>
            {user?.showTimeTaken && (
              <div className="flex items-center gap-x-1">
                <Clock className="size-4" />
                <p>
                  <span>{minutes}</span>:<span>{seconds}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Separator />
      <div className="">
        {question?.tags && (
          <div className="flex flex-wrap gap-2">
            {question.tags.map((tag) => (
              <span
                key={tag?.tag?.uid}
                className="bg-black-50 text-white rounded-full px-2 py-1 text-xs"
              >
                {tag.tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="bg-black-75 rounded-xl p-4 space-y-4">
        {question?.codeSnippet && (
          <div className="space-y-1">
            <p className="text-white text-sm font-satoshi font-semibold"></p>
            <QuestionDisplay content={question.codeSnippet} />
          </div>
        )}
        {question && (
          <AnswerQuestionForm
            userData={user}
            uid={uid}
            question={question}
            time={totalSeconds}
            stopwatchPause={pause}
            resetStopwatch={reset}
          />
        )}
      </div>
    </>
  );
}
