'use client';

import { useTransition } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

// components
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SortIcon from '@/components/ui/icons/sort';
import { Check } from 'lucide-react';

export default function SortDropdown() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const ascending = searchParams.get('ascending') === 'true';
  const sortBy = searchParams.get('sortBy') as string;

  // Helper to update query params
  const updateQueryParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div data-pending={isPending ? '' : undefined}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            padding="md"
            size="lg"
            variant="default"
            className="flex items-center justify-center gap-x-1 text-sm group"
          >
            {sortBy && (
              <span className="text-[10px] bg-white text-black px-2 rounded-full mr-1">
                1
              </span>
            )}
            Sort
            <SortIcon className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="!p-0 w-40 bg-black border border-black-50 text-white text-sm"
        >
          <DropdownMenuGroup className="p-1">
            <DropdownMenuItem
              className="flex items-center justify-between hover:cursor-pointer py-2"
              onClick={() =>
                startTransition(() => updateQueryParams('sortBy', 'date'))
              }
            >
              <span className="text-white">Date</span>
              {sortBy === 'date' && <Check className="size-4 text-white" />}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center justify-between hover:cursor-pointer py-2"
              onClick={() =>
                startTransition(() =>
                  updateQueryParams('sortBy', 'submissions')
                )
              }
            >
              <span className="text-white">Submissions</span>
              {sortBy === 'submissions' && (
                <Check className="size-4 text-white" />
              )}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <div
            className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
              sortBy ? 'max-h-14 p-2 pt-0' : 'max-h-0'
            }`}
          >
            <Button
              variant="destructive"
              size="sm"
              onClick={() => updateQueryParams('sortBy', null)}
              className="w-full"
            >
              Clear Sort
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
