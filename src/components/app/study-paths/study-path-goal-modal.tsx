'use client';
import { useState, useTransition } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import type { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import ArcheryTarget from '@/components/ui/icons/target';
import { Calendar } from '@/components/ui/calendar';

import { addDays } from 'date-fns';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { TooltipContent } from '@/components/ui/tooltip';
import { Tooltip, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';

import type { UserRecord } from '@/types';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';

import type { StudyPath, StudyPathGoal } from '@prisma/client';
import { getRecommendedCompletionDate } from '@/utils/roadmaps';
import { setUserStudyPathGoal } from '@/actions/study-paths/set-goal';

interface StudyPathGoalModalProps {
  user: UserRecord | null;
  studyPath: StudyPath;
  goal: StudyPathGoal | null;
}

function CalendarComponent({
  onClose,
  recommendedCompletionDate,
  studyPathUid,
}: {
  onClose: () => void;
  recommendedCompletionDate: Date;
  studyPathUid: string;
}) {
  const today = new Date();
  const [date, setDate] = useState<DateRange | undefined>({
    from: today,
    to: recommendedCompletionDate || addDays(today, 7),
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [goalDate, setGoalDate] = useState<Date | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSetGoal = async () => {
    if (!date?.to) {
      return;
    }

    startTransition(async () => {
      const { success } = await setUserStudyPathGoal(studyPathUid, date.to as Date);

      if (success) {
        setGoalDate(date.to as Date);
        setIsSuccess(true);
      }
    });
  };

  return (
    <div className="flex flex-col gap-4 w-fit">
      <AnimatePresence mode="wait" initial={false}>
        {!isSuccess ? (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Calendar
              mode="range"
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              pagedNavigation
              showOutsideDays={false}
              className="w-fit rounded-lg border border-black-50 p-2 bg-background"
              classNames={{
                months: 'flex gap-8',
                month:
                  'relative first-of-type:before:hidden before:absolute max-sm:before:inset-x-2 max-sm:before:h-px max-sm:before:-top-2 sm:before:inset-y-2 sm:before:w-px before:bg-black-50 sm:before:-left-4',
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.4, type: 'spring', delay: 0.3 }}
            className="flex flex-col items-center justify-center py-12 px-8 text-center"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Goal Set Successfully!</h3>
            <p className="text-muted-foreground mb-4">
              You've committed to complete this study path by{' '}
              {goalDate?.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
            <p className="text-sm text-muted-foreground">
              You'll receive daily reminders to help you stay on track.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isSuccess && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-4"
          >
            <div
              className="mt-2 text-center text-xs text-muted-foreground flex items-center justify-between"
              role="region"
              aria-live="polite"
            >
              {/** resets the date selection */}
              <Button variant="destructive" onClick={() => setDate(undefined)}>
                Clear
              </Button>

              <div className="flex items-center gap-2">
                <Button onClick={onClose}>Cancel</Button>
                {/** button is disabled if date is not set */}
                <Button variant="accent" disabled={!date || isPending} onClick={handleSetGoal}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Setting...
                    </>
                  ) : (
                    'Set goal'
                  )}
                </Button>
              </div>
            </div>
            {/** once a date is set, show a message stating 'by pressing set goal, you will receive a daily reminder to complete the next question' */}
            <AnimatePresence>
              {date?.to && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs text-muted-foreground"
                >
                  By pressing 'Set goal', you consent to receive a daily email reminder to complete
                  your next question until{' '}
                  {date.to?.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}{' '}
                  or until you have completed the study path, whichever comes first.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function StudyPathGoalModal({ user, studyPath, goal }: StudyPathGoalModalProps) {
  const [open, setOpen] = useState(false);

  // Get the recommended completion date for the study path.
  const recommendedCompletionDate = getRecommendedCompletionDate({
    user,
    studyPath,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild disabled={!user || !!goal}>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          {user ? (
            <>
              {goal ? (
                <div className="flex flex-col gap-y-2 w-full">
                  <Button fullWidth disabled={true}>
                    <p className="text-xs text-muted-foreground flex items-center gap-x-2">
                      Complete by{' '}
                      {new Date(goal.targetDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                      <ArrowRight className="size-4" />
                    </p>
                  </Button>
                </div>
              ) : (
                <Button fullWidth>Set a Goal</Button>
              )}
            </>
          ) : (
            <Button href="/login" fullWidth variant="accent">
              Sign in to set a goal
            </Button>
          )}
        </motion.div>
      </DialogTrigger>

      <DialogContent className="bg-black max-w-[39.4rem]">
        <DialogHeader className="flex flex-col">
          <ArcheryTarget height="48" width="48" />
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <DialogTitle className="text-2xl">Set a Goal</DialogTitle>
            <DialogDescription className="flex flex-col gap-y-2">
              <p>
                Set a goal date to complete this study path. Receive a daily reminder to complete
                the next question.
              </p>
              <div className="flex items-center gap-x-2">
                <p>
                  Your recommended completion date is{' '}
                  {recommendedCompletionDate?.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <InfoCircledIcon />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        This recommended completion date is calculated based on your current
                        progress, the amount of time per day you want to spend, and the average time
                        it takes to complete a question.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </DialogDescription>
          </motion.div>
        </DialogHeader>
        <CalendarComponent
          onClose={() => setOpen(false)}
          recommendedCompletionDate={recommendedCompletionDate}
          studyPathUid={studyPath.uid}
        />
      </DialogContent>
    </Dialog>
  );
}
