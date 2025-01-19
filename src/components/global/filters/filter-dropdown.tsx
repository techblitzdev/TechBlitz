'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from '@/components/ui/dropdown-menu';
import MaterialSymbolsFilterListRounded from '@/components/ui/icons/filter';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { capitalise } from '@/utils';

export default function FilterDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [showDifficulty, setShowDifficulty] = useState(false);
  const [showQuestionType, setShowQuestionType] = useState(false);

  const completedFilter = searchParams.get('completed');
  const difficultyFilter = searchParams.get('difficulty');
  const questionTypeFilter = searchParams.get('questionType');

  const updateQueryParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');

    if (
      value === null ||
      (key === 'completed' && value === completedFilter) ||
      (key === 'difficulty' && value === difficultyFilter) ||
      (key === 'questionType' && value === questionTypeFilter)
    ) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div
      className="flex items-center space-x-2"
      data-pending={isPending ? '' : undefined}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            padding="md"
            variant="default"
            size="lg"
            className="flex items-center gap-x-2 text-sm group"
          >
            <MaterialSymbolsFilterListRounded className="size-5" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="!p-0 w-40 bg-black border border-black-50 text-white text-sm"
        >
          <DropdownMenuGroup className="p-1">
            <DropdownMenuSub
              open={showDifficulty}
              onOpenChange={setShowDifficulty}
            >
              <DropdownMenuSubTrigger className="py-2 flex items-center justify-between hover:!text-white hover:cursor-pointer">
                Difficulty
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="bg-black border border-black-50 text-white">
                {['Beginner', 'Easy', 'Medium', 'Hard'].map((difficulty) => (
                  <DropdownMenuItem
                    key={difficulty}
                    onClick={() =>
                      updateQueryParams('difficulty', difficulty.toLowerCase())
                    }
                    className="py-2 hover:!text-white hover:cursor-pointer"
                  >
                    {difficulty}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem
              onClick={() =>
                updateQueryParams(
                  'completed',
                  completedFilter === 'true' ? null : 'true'
                )
              }
              className="py-2 flex items-center hover:!text-white hover:cursor-pointer"
            >
              Completed
            </DropdownMenuItem>
            <DropdownMenuSub
              open={showQuestionType}
              onOpenChange={setShowQuestionType}
            >
              <DropdownMenuSubTrigger className="py-2 flex items-center justify-between hover:!text-white hover:cursor-pointer">
                Question Type
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="bg-black border border-black-50 text-white">
                {['CODING_CHALLENGE', 'MULTIPLE_CHOICE'].map((type) => (
                  <DropdownMenuItem
                    key={type}
                    onClick={() => updateQueryParams('questionType', type)}
                    className="py-2 hover:!text-white hover:cursor-pointer"
                  >
                    {capitalise(type).replace('_', ' ')}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
