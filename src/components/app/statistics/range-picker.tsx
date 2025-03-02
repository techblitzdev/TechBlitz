'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronDown } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { STATISTICS } from '@/utils/constants';

export default function StatsRangePicker(opts: { selectedRange: string }) {
  const { selectedRange } = opts;

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
          className="flex items-center justify-between text-xs group w-44"
        >
          <div className="flex gap-x-2 items-center">
            <Calendar className="size-4" />
            {selectedRange ? selectedRange : 'Date Range'}
          </div>
          <ChevronDown className="size-3 duration-200 group-data-[state=open]:-rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="p-0! w-44 bg-black border border-black-50 text-white text-sm"
      >
        <DropdownMenuGroup className="p-1">
          {Object.values(STATISTICS).map((step) => (
            <DropdownMenuItem
              key={step.value}
              className="hover:text-white! hover:cursor-pointer"
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
