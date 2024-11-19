'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { ChevronDown, Tag } from 'lucide-react';

export default function FilterButtonTags() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          padding="sm"
          size="sm"
          className="flex items-center gap-x-2.5 text-xs group"
        >
          <Tag className="size-3" />
          <span>Tags</span>
          <ChevronDown className="size-3 duration-200 group-data-[state=open]:-rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="!p-0 w-40 bg-black border border-black-50 text-white text-sm"
      >
        <DropdownMenuGroup className="p-1">Testing</DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
