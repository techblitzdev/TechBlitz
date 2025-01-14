import { useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { UserRecord } from '@/types/User';
import type { Answer } from '@/types/Answers';
import LoadingSpinner from '@/components/ui/loading';
import { formatSeconds } from '@/utils/time';
import { ResetIcon } from '@radix-ui/react-icons';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { DatePicker } from '@mantine/dates';
import { getUserDailyStats } from '@/utils/data/user/authed/get-daily-streak';
import {
  CheckCircle2Icon,
  XCircleIcon,
  ClockIcon,
  LinkIcon,
  TrophyIcon,
  Flame,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  CORRECT_ANSWER_CONTENT,
  INCORRECT_ANSWER_CONTENT,
} from '@/utils/constants/answer-content';
import { useQuestionSingle } from './layout/question-single-context';

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
    heading:
      CORRECT_ANSWER_CONTENT[
        Math.floor(Math.random() * CORRECT_ANSWER_CONTENT.length)
      ] + ` ${name || 'learner'}!`,
    description: 'You got the answer right, great job! Try another one?',
    icon: <CheckCircle2Icon className="text-green-500 size-16" />,
  }),
  incorrect: {
    heading:
      INCORRECT_ANSWER_CONTENT[
        Math.floor(Math.random() * INCORRECT_ANSWER_CONTENT.length)
      ],
    description: 'Learning from mistakes is how we grow, try again?',
    icon: <XCircleIcon className="text-red-500 size-16" />,
  },
};

export default function AnswerQuestionModal({
  user,
  correct,
  isOpen,
  onOpenChange,
  onRetry,
  nextQuestion,
  isDailyQuestion,
}: AnswerQuestionModalProps) {
  const router = useRouter();

  const { timeTaken } = useQuestionSingle();

  const getDialogContent = useCallback(() => {
    if (correct === 'init') {
      return null;
    }
    return correct === 'correct'
      ? dialogContent.correct(user?.username || '')
      : dialogContent.incorrect;
  }, [correct, user?.username]);

  const content = getDialogContent();

  const { data: streakData } = useQuery({
    queryKey: ['streak-data', user.uid],
    queryFn: async () => await getUserDailyStats(),
  });

  const dateArray = [
    streakData?.streakData?.streakStart,
    streakData?.streakData?.streakEnd,
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
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-black-75 sm:border sm:border-black-50 shadow-2xl py-6 px-8 md:max-w-2xl max-h-screen overflow-y-scroll rounded-none sm:rounded-xl"
        aria-label="Answer question modal"
        showCloseButton={false}
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        {correct === 'init' ? (
          <div className="h-36 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="w-full flex flex-col">
              <div className="flex w-full justify-between">
                {content?.icon && <div className="mb-4">{content.icon}</div>}
                <Button className="bg-black-75 border border-black-50 rounded-lg w-fit">
                  <ResetIcon
                    className="cursor-pointer size-4"
                    onClick={onRetry}
                  />
                </Button>
              </div>
              <DialogTitle className="text-3xl font-bold text-white">
                {content?.heading}
              </DialogTitle>
              <DialogDescription className="mt-2 text-gray-300 text-base">
                {content?.description}
              </DialogDescription>
            </div>

            {isDailyQuestion && (
              <div className="w-full flex flex-col items-center lg:flex-row gap-4 lg:items-start">
                {/* Styled Date Picker */}
                <DatePicker
                  className="order-2 lg:order-1 z-30 text-white border border-black-50 p-2 rounded-md bg-black-100 hover:cursor-default"
                  color="white"
                  type="range"
                  value={dateArray}
                  c="gray"
                  inputMode="none"
                />

                <div className="order-1 lg:order-2 text-sm flex flex-col gap-2 p-4 text-gray-300 bg-black-100 border border-black-50 h-full w-full rounded-md">
                  <>
                    <h6 className="text-base font-bold underline">Stats</h6>
                    {user.showTimeTaken &&
                      correct === 'correct' &&
                      timeTaken && (
                        <div className="rounded-xl flex items-center gap-2">
                          <ClockIcon className="text-gray-500 size-5" />
                          <p className="text-gray-200">
                            Answered in: {formatSeconds(timeTaken)}
                          </p>
                        </div>
                      )}
                    {/* Streak Stats */}
                    {streakData?.streakData && (
                      <>
                        <div className="flex items-center gap-2">
                          <TrophyIcon className="text-yellow-500 size-5" />
                          <span className="font-semibold">
                            Current Streak:{' '}
                            {streakData.streakData.currentstreakCount} day
                            {streakData.streakData.currentstreakCount !== 1 &&
                              's'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Flame className="text-orange-500 fill-red-500 size-5" />
                          <span className="font-semibold">
                            Longest Streak:{' '}
                            {streakData.streakData.longestStreak}
                          </span>
                        </div>
                      </>
                    )}
                  </>
                </div>
              </div>
            )}

            {correct === 'correct' && isDailyQuestion && (
              <div className="text-center text-white font-medium text-sm">
                Keep your momentum going! Come back tomorrow to maintain your
                streak.
              </div>
            )}
          </div>
        )}
        <DialogFooter className="flex w-full justify-between gap-3 mt-6">
          <div className="flex w-full justify-between">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="default" onClick={() => copyLink()}>
                    <LinkIcon className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy link</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="flex gap-3 w-full justify-end">
              {correct === 'incorrect' ? (
                <Button
                  variant="default"
                  onClick={onRetry}
                  className="!w-fit flex items-center gap-2"
                >
                  <ResetIcon className="size-4" />
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
              <Button
                variant="secondary"
                onClick={handleNextQuestion}
                className="flex items-center gap-2"
                fullWidth={false}
              >
                Next question
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
