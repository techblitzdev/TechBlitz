import { useCallback, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { UserRecord } from '@/types/User';
import type { Answer } from '@/types/Answers';
import LoadingSpinner from '@/components/ui/loading';
import { convertSecondsToTime, formatSeconds } from '@/utils/time';
import JsonDisplay from '../../global/json-display';
import { LockClosedIcon } from '@radix-ui/react-icons';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { DatePicker } from '@mantine/dates';
import { getUserDailyStats } from '@/actions/user/get-daily-streak';
import {
  CheckCircle2Icon,
  XCircleIcon,
  ClockIcon,
  RepeatIcon,
  ArrowRightIcon,
  LinkIcon
} from 'lucide-react';
import { toast } from 'sonner';

type AnswerQuestionModalProps = {
  user: UserRecord;
  correct: 'correct' | 'incorrect' | 'init';
  userAnswer: Answer;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onRetry?: () => void;
  onNext?: () => void;
  nextQuestion?: string;
  isDailyQuestion?: boolean;
};

type DialogContentType = {
  correct: (name: string) => {
    heading: string;
    description: string;
    icon: React.ReactNode;
  };
  incorrect: {
    heading: string;
    description: string;
    icon: React.ReactNode;
  };
};

const dialogContent: DialogContentType = {
  correct: (name: string) => ({
    heading: `Excellent work, ${name || 'learner'}!`,
    description: 'You got the answer right!',
    icon: <CheckCircle2Icon className="text-green-500 size-16" />
  }),
  incorrect: {
    heading: 'Keep pushing forward!',
    description: 'Learning from mistakes is how we grow, try again?',
    icon: <XCircleIcon className="text-red-500 size-16" />
  }
};

export default function AnswerQuestionModal({
  user,
  correct,
  userAnswer,
  isOpen,
  onOpenChange,
  onRetry,
  onNext,
  nextQuestion,
  isDailyQuestion
}: AnswerQuestionModalProps) {
  const router = useRouter();
  const [showQuestionData, setShowQuestionData] = useState(false);

  const getDialogContent = useCallback(() => {
    if (correct === 'init') {
      return null;
    }
    return correct === 'correct'
      ? dialogContent.correct(user?.username || '')
      : dialogContent.incorrect;
  }, [correct, user?.username]);

  const content = getDialogContent();

  const timeTaken = convertSecondsToTime(userAnswer?.timeTaken || 0);

  const {
    data: streakData,
    refetch: refetchStreak,
    isLoading: streakLoading
  } = useQuery({
    queryKey: ['streak-data', user.uid],
    queryFn: async () => await getUserDailyStats(user.uid)
  });

  const dateArray = [
    streakData?.streakData?.streakStart,
    streakData?.streakData?.streakEnd
  ] as [Date, Date];

  const handleNextQuestion = () => {
    if (user.userLevel === 'FREE' && correct === 'correct') {
      return;
    }

    if (nextQuestion) {
      router.push(`/question/${nextQuestion}`);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);

    toast.success('Question link copied to clipboard!');
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className="bg-black-75 rounded-2xl shadow-2xl border-none py-6 px-8 md:max-w-2xl"
        aria-description="Answer question modal"
      >
        {correct === 'init' ? (
          <div className="h-36 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="w-full flex flex-col ">
              {content?.icon && <div className="mb-4">{content.icon}</div>}
              <DialogTitle className="text-3xl font-bold text-white">
                {content?.heading}
              </DialogTitle>
              <DialogDescription className="mt-2 text-gray-300 text-base">
                {content?.description}
              </DialogDescription>
            </div>

            {user.showTimeTaken &&
              correct === 'correct' &&
              userAnswer.timeTaken && (
                <div className="rounded-xl flex items-center gap-1">
                  <ClockIcon className="text-gray-500 size-6" />
                  <p className="text-gray-200">
                    {timeTaken.minutes > 0 && (
                      <span>
                        {timeTaken.minutes} minute
                        {timeTaken.minutes > 1 && 's'}{' '}
                      </span>
                    )}
                    {formatSeconds(userAnswer.timeTaken)}
                  </p>
                </div>
              )}

            {isDailyQuestion && (
              <div className="w-full flex justify-center">
                <DatePicker
                  className="z-30 text-white border border-black-50 p-2 rounded-md bg-white dark:bg-black-100 hover:cursor-default"
                  color="white"
                  type="range"
                  value={dateArray}
                  c="gray"
                  inputMode="none"
                />
              </div>
            )}

            {correct === 'correct' && isDailyQuestion && (
              <div className="text-center text-green-600 dark:text-green-400 font-medium">
                Keep your momentum going! Come back tomorrow to maintain your
                streak.
              </div>
            )}

            {showQuestionData && (
              <div className="mt-4">
                <JsonDisplay data={userAnswer} />
              </div>
            )}
          </div>
        )}
        <DialogFooter className="flex w-full justify-between gap-3 mt-6">
          {/* {user.userLevel === 'ADMIN' && (
            <Button
              variant="outline"
              onClick={() => setShowQuestionData(!showQuestionData)}
              className="text-gray-300"
            >
              {showQuestionData ? 'Hide' : 'Show'} question data
            </Button>
          )} */}
          <div className="flex w-full justify-between">
            <Button
              variant="default"
              onClick={() => copyLink()}
            >
              <LinkIcon className="size-4" />
            </Button>
            <div className="flex gap-3 w-full justify-end">
              {correct === 'incorrect' ? (
                <Button
                  variant="default"
                  onClick={onRetry}
                  className="!w-fit flex items-center gap-2"
                >
                  <RepeatIcon className="size-4" />
                  Retry question
                </Button>
              ) : (
                <Button
                  variant="default"
                  onClick={() => router.push('/dashboard')}
                >
                  Dashboard
                </Button>
              )}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant="secondary"
                      onClick={handleNextQuestion}
                      className="flex items-center gap-2"
                      fullWidth={false}
                      disabled={user?.userLevel === 'FREE'}
                    >
                      Next question
                      <ArrowRightIcon className="size-4" />
                      {user?.userLevel === 'FREE' && <LockClosedIcon />}
                    </Button>
                    {user?.userLevel === 'FREE' && (
                      <TooltipContent>
                        <p>Upgrade to premium to unlock the next question</p>
                      </TooltipContent>
                    )}
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
