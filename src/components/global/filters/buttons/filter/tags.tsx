'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tags } from '@/types/Tags';
import { capitalise } from '@/utils';
import { Check, ChevronDown, Tag } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function FilterButtonTags(opts: { tags: Tags['tag'][] }) {
  const { tags } = opts;

  const router = useRouter();
  const searchParams = useSearchParams();

  const updateTagsInQuery = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentTags = params.get('tags')?.split(',') || [];

    if (currentTags.includes(tag)) {
      // Remove tag if it already exists
      const updatedTags = currentTags.filter((t) => t !== tag);
      if (updatedTags.length > 0) {
        params.set('tags', updatedTags.join(','));
      } else {
        params.delete('tags');
      }
    } else {
      // Add tag if it doesn't exist
      currentTags.push(tag);
      params.set('tags', currentTags.join(','));
    }

    // Reset the page to 1 whenever tags are updated
    params.set('page', '1');
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
          <Tag className="size-3" />
          <span>Tags</span>
          <ChevronDown className="size-3 duration-200 group-data-[state=open]:-rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="!p-0 w-40 bg-black border border-black-50 text-white text-sm"
      >
        <DropdownMenuGroup className="p-1">
          {tags.map((tag) => {
            const isSelected = (searchParams.get('tags') || '')
              .split(',')
              .includes(tag.name);

            return (
              <DropdownMenuItem
                key={tag.uid}
                className="p-2 flex items-center gap-x-2 hover:!text-white hover:cursor-pointer"
                onClick={() => updateTagsInQuery(tag.name)}
              >
                <div className="flex items-center w-full justify-between">
                  {capitalise(tag.name)}
                  {isSelected && <Check className="size-3" />}
                </div>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
