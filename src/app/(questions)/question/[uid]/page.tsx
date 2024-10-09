'use client';
import { useQuery } from '@tanstack/react-query';
import { getQuestion } from '@/actions/questions/get';
import LoadingSpinner from '@/components/ui/loading';
import { useUser } from '@/hooks/useUser';
import AnswerQuestionForm from '@/components/questions/answer-question-form';
import { Separator } from '@/components/ui/separator';
import { BreadcrumbWithCustomSeparator } from '@/components/global/breadcrumbs';
import { useStopwatch } from 'react-timer-hook';

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

  // Timer setup if the user has `showTimeTaken` enabled
  const { seconds, minutes, pause, isRunning, reset, totalSeconds } =
    useStopwatch({
      autoStart: true,
    });

  if (userLoading || isPending || !question) {
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
        <BreadcrumbWithCustomSeparator items={items} />
        <div className="flex items-center">
          <span>{minutes}</span>:<span>{seconds}</span>
        </div>
      </div>
      <Separator />
      <AnswerQuestionForm
        userData={user}
        uid={uid}
        question={question}
        time={totalSeconds}
        stopwatchPause={pause}
      />
    </>
  );
}
