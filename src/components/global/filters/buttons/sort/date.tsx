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
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import { useState, useTransition } from 'react';

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
    <div data-pending={isPending ? '' : undefined}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            padding="sm"
            size="sm"
            variant="default"
            className="flex items-center gap-x-1 text-xs group"
          >
            <ArrowUpDown className="size-4" />
            Sort
            <ChevronDown className="size-3 duration-200 group-data-[state=open]:-rotate-180" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="!p-0 w-56 bg-black border border-black-50 text-white text-sm"
        >
          <DropdownMenuGroup className="p-1">
            <DropdownMenuItem className="flex items-center justify-between hover:!bg-transparent">
              <span className="text-white">Date</span>
              <Switch
                className="data-[state=checked]:bg-accent data-[state=unchecked]:bg-primary"
                checked={ascending}
                onCheckedChange={(checked) =>
                  startTransition(() =>
                    handleSwitchChange('ascending', setAscending, checked)
                  )
                }
              />
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <Separator className="bg-black-50" />
          <DropdownMenuItem
            className="text-red-500 px-4 py-2 flex justify-end text-right hover:!bg-transparent hover:!text-red-800 duration-300 hover:cursor-pointer !text-xs"
            onClick={() => startTransition(() => clearSorting())}
          >
            Clear
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
