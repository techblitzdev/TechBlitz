'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { Calendar } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { STATISTICS_STEPS } from '@/utils/constants/statistics-filters';

export default function StatsRangePicker() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateDateRange = (range: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('range', range);
    router.push(`?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          padding="sm"
          size="sm"
          className="flex items-center gap-x-2.5 text-xs group"
        >
          <Calendar className="size-4 mr-2" />
          Date Range
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="!p-0 w-40 bg-black border border-black-50 text-white text-sm"
      >
        <DropdownMenuGroup className="p-1">
          {STATISTICS_STEPS.map((step) => (
            <DropdownMenuItem
              key={step.value}
              className="hover:!text-white"
              onClick={() => updateDateRange(step.value)}
            >
              {step.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
