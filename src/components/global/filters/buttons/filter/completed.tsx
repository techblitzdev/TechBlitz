'use client';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function FilterButtonCompleted() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the current value of the filter
  const completedFilter = searchParams.get('completed');

  // Helper to update query params
  const updateQueryParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    // If 'completed' is being set or cleared, ensure page is reset to 1
    params.set('page', '1');

    // Toggle filter: if the same value is clicked, remove the filter, else set it
    if (value === completedFilter) {
      params.delete(key); // Remove the filter
    } else {
      params.set(key, value || ''); // Set the new filter
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          padding="sm"
          variant="default"
          size="sm"
          className="flex items-center gap-x-1 text-xs group"
        >
          <Check className="size-4" />
          Completed
          <ChevronDown className="size-3 duration-200 group-data-[state=open]:-rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="!p-0 w-40 bg-black border border-black-50 text-white text-sm"
      >
        <DropdownMenuGroup className="p-1">
          <DropdownMenuItem
            asChild
            className="flex items-center justify-between hover:!bg-transparent"
          >
            <button onClick={() => updateQueryParams('completed', 'true')}>
              Completed
            </button>
          </DropdownMenuItem>

          <DropdownMenuItem
            asChild
            className="flex items-center justify-between hover:!bg-transparent"
          >
            <button onClick={() => updateQueryParams('completed', 'false')}>
              Incomplete
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
