'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { ArrowDownNarrowWide, ArrowUpDown, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function FilterButtonsSort() {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  // State for switches
  const [ascending, setAscending] = useState(
    searchParams.get('ascending') === 'true'
  );

  const handleSwitchChange = (
    key: string,
    stateSetter: React.Dispatch<React.SetStateAction<boolean>>,
    value: boolean
  ) => {
    stateSetter(value);
    updateQueryParams(key, value ? 'true' : null);
  };

  const clearSorting = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Remove both parameters
    params.delete('ascending');

    // Reset local state
    setAscending(false);

    // Update the URL
    router.push(`?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          padding="sm"
          variant="default"
          className="flex items-center gap-x-1 text-xs"
        >
          <ArrowUpDown className="size-4" />
          Sort
          <ChevronDown className="size-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="!p-0 w-56 bg-black border border-black-50 text-white text-sm"
      >
        <DropdownMenuLabel className="px-4 py-3">Sort by</DropdownMenuLabel>
        <Separator className="bg-black-50" />
        <DropdownMenuGroup className="py-2 p-2">
          <DropdownMenuItem className="flex items-center justify-between">
            <span className="text-white">Date</span>
            <Switch
              checked={ascending}
              onCheckedChange={(checked) =>
                handleSwitchChange('ascending', setAscending, checked)
              }
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <Separator className="bg-black-50" />
        <DropdownMenuItem
          className="text-red-500 px-4 py-2 flex justify-end text-right hover:!bg-transparent hover:!text-red-800 duration-300 hover:cursor-pointer !text-xs"
          onClick={() => clearSorting()}
        >
          Clear
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
