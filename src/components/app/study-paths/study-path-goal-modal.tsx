'use client';
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
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { motion, AnimatePresence } from 'framer-motion';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { TooltipContent } from '@/components/ui/tooltip';
import { Tooltip, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import { UserRecord } from '@/types/User';
import { getRecommendedCompletionDate } from '@/utils/roadmap';
import { StudyPath } from '@prisma/client';

interface StudyPathGoalModalProps {
  user: UserRecord | null;
  studyPath: StudyPath;
}

function CalendarComponent({ onClose }: { onClose: () => void }) {
  const today = new Date();
  const [date, setDate] = useState<DateRange | undefined>({
    from: today,
    to: addDays(today, 7),
  });

  return (
    <div className="flex flex-col gap-4 w-fit">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
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

      <div className="flex flex-col gap-4">
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
            <Button variant="accent" disabled={!date}>
              Set goal
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
              By pressing 'Set goal', you consent to receive a daily email reminder to complete your
              next question until{' '}
              {date.to?.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}{' '}
              or until you have completed the study path, whichever comes first.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function StudyPathGoalModal({ user, studyPath }: StudyPathGoalModalProps) {
  const [open, setOpen] = useState(false);

  // Get the recommended completion date for the study path.
  const recommendedCompletionDate = getRecommendedCompletionDate({
    user,
    studyPath,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button fullWidth disabled={!user}>
            Set a Goal
          </Button>
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
                        This recommended completion date is based on your current progress, the
                        amount of time per day you want to spend and the average time it takes to
                        complete a question.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </DialogDescription>
          </motion.div>
        </DialogHeader>
        <CalendarComponent onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
