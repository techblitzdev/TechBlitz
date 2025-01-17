'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
//import { Separator } from '@/components/ui/separator';
import { Check } from 'lucide-react';
import { useState, useTransition } from 'react';
import SortIcon from '@/components/ui/icons/sort';

export default function FilterButtonsSort() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

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

  // State for sorting
  const [ascending, setAscending] = useState(
    searchParams.get('ascending') === 'true'
  );

  const toggleSortOrder = () => {
    const newAscending = !ascending;
    setAscending(newAscending);
    updateQueryParams('ascending', newAscending ? 'true' : null);
  };

  //const clearSorting = () => {
  //  const params = new URLSearchParams(searchParams.toString());
  //
  //  // Remove both parameters
  //  params.delete('ascending');
  //
  //  // Reset local state
  //  setAscending(false);
  //
  //  // Update the URL
  //  router.push(`?${params.toString()}`);
  //};

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
            {ascending && (
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
              className="flex items-center justify-between hover:cursor-pointer"
              onClick={() => startTransition(() => toggleSortOrder())}
            >
              <span className="text-white">Date</span>
              {ascending && <Check className="size-4 text-white" />}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
