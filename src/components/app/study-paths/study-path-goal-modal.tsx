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
    <div className="flex flex-col gap-4 w-fit">
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
      <div
        className="mt-2 text-center text-xs text-muted-foreground flex items-center justify-between"
        role="region"
        aria-live="polite"
      >
        <Button variant="destructive" onClick={() => setDate(undefined)}>
          Clear
        </Button>

        <div className="flex items-center gap-2">
          <Button>Cancel</Button>
          <Button variant="accent">Set goal</Button>
        </div>
      </div>
    </div>
  );
}

export default function StudyPathGoalModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button fullWidth>Set a Goal</Button>
      </DialogTrigger>
      <DialogContent className="bg-black max-w-[34rem]">
        <DialogHeader className="flex flex-col">
          <ArcheryTarget height="48" width="48" />
          <div className="flex flex-col">
            <DialogTitle className="text-xl">Set a Goal</DialogTitle>
            <DialogDescription>
              Set a goal date to complete this study path. Receive a daily reminder to complete the
              next question.
            </DialogDescription>
          </div>
        </DialogHeader>
        <Component />
      </DialogContent>
    </Dialog>
  );
}
