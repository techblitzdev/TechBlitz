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
import { Switch } from '@/components/ui/switch';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function FilterButtonCompleted() {
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
  const [completed, setCompleted] = useState(
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
        className="!p-0 w-56 bg-black border border-black-50 text-white text-sm"
      >
        <DropdownMenuGroup className="p-1">
          <DropdownMenuItem className="flex items-center justify-between hover:!bg-transparent">
            <span className="text-white">Completed</span>
            <Switch
              className="data-[state=checked]:bg-accent data-[state=unchecked]:bg-primary"
              checked={completed}
              onCheckedChange={(checked) =>
                handleSwitchChange('completed', setCompleted, checked)
              }
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
