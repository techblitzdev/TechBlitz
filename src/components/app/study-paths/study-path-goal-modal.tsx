'use client';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
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
import { addDays, format } from 'date-fns';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

function Component() {
  const today = new Date();
  const [date, setDate] = useState<DateRange | undefined>({
    from: today,
    to: addDays(today, 25),
  });

  return (
    <div className="flex flex-col gap-4 items-center">
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
      <p
        className="mt-4 text-center text-xs text-muted-foreground"
        role="region"
        aria-live="polite"
      >
        Two months calendar -{' '}
        <a
          className="underline hover:text-foreground"
          href="https://daypicker.dev/"
          target="_blank"
          rel="noopener nofollow"
        >
          React DayPicker
        </a>
      </p>
    </div>
  );
}

export default function StudyPathGoalModal() {
  const today = new Date();
  const [date, setDate] = useState<DateRange | undefined>({
    from: today,
    to: addDays(today, 25),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button fullWidth>Set a Goal</Button>
      </DialogTrigger>
      <DialogContent className="bg-black max-w-2xl">
        <DialogHeader className="flex flex-col gap-2">
          <ArcheryTarget height="36" width="36" />
          <DialogTitle>Set a Goal</DialogTitle>
          <DialogDescription>
            Set a goal date to complete this study path. Receive a daily reminder to complete the
            next question.
          </DialogDescription>
        </DialogHeader>
        <Component />
      </DialogContent>
    </Dialog>
  );
}
