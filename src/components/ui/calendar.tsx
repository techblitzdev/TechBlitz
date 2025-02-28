'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  components: userComponents,
  ...props
}: CalendarProps) {
  const defaultClassNames = {
    months: 'relative flex flex-col sm:flex-row gap-4',
    month: 'w-full',
    month_caption: 'relative flex h-9 items-center justify-center',
    caption_label: 'text-sm font-medium pb-4 pt-2 flex justify-center',
    nav: 'absolute top-3 flex w-full justify-between z-10',
    weekday: 'size-9 p-0 text-xs font-medium text-muted-foreground/80',
    day_button:
      'relative flex size-9 items-center justify-center whitespace-nowrap rounded-lg p-0 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&:not([disabled])]:cursor-pointer',
    day: 'size-9 p-0 font-normal aria-selected:opacity-100',
    day_today:
      'text-white relative before:absolute before:h-1 before:w-1 before:rounded-full before:bottom-1 before:left-1/2 before:-translate-x-1/2 before:bg-secondary',
    day_selected:
      'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
    day_range_start: 'rounded-l-lg !bg-accent text-white',
    day_range_end: 'rounded-r-lg !bg-accent text-white',
    day_range_middle: 'rounded-none bg-accent',
    day_outside: 'text-muted-foreground opacity-50',
    day_disabled: 'text-muted-foreground opacity-50',
    day_hidden: 'invisible',
    today:
      'bg-accent/10 text-accent-foreground relative before:absolute before:h-1 before:w-1 before:rounded-full before:bottom-1 before:left-1/2 before:-translate-x-1/2 before:bg-primary',
    outside: 'text-muted-foreground/50',
    hidden: 'invisible',
    week_number: 'size-9 p-0 text-xs font-medium text-muted-foreground/80',
  };

  const mergedClassNames: typeof defaultClassNames = Object.keys(defaultClassNames).reduce(
    (acc, key) => ({
      ...acc,
      [key]: classNames?.[key as keyof typeof classNames]
        ? cn(
            defaultClassNames[key as keyof typeof defaultClassNames],
            classNames[key as keyof typeof classNames]
          )
        : defaultClassNames[key as keyof typeof defaultClassNames],
    }),
    {} as typeof defaultClassNames
  );

  const defaultComponents = {
    Chevron: (props: any) => {
      if (props.orientation === 'left') {
        return <ChevronLeft size="12px" strokeWidth={2} {...props} aria-hidden="true" />;
      }
      return <ChevronRight size="12px" strokeWidth={2} {...props} aria-hidden="true" />;
    },
  };

  const mergedComponents = {
    ...defaultComponents,
    ...userComponents,
  };

  return (
    <DayPicker
      disabled={{ before: new Date() }} // cannot start the roadmap in the past
      showOutsideDays={showOutsideDays}
      className={cn('w-fit p-3', className)}
      classNames={mergedClassNames}
      components={mergedComponents}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
