'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check, ChevronDown } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

type QuestionDifficulty = 'EASY' | 'MEDIUM' | 'HARD';

interface DifficultyConfig {
  color: string;
  label: string;
}

const DIFFICULTY_MAP: Record<QuestionDifficulty | 'DEFAULT', DifficultyConfig> =
  {
    EASY: {
      color: '#10B981',
      label: 'Easy',
    },
    MEDIUM: {
      color: '#F59E0B',
      label: 'Medium',
    },
    HARD: {
      color: '#EF4444',
      label: 'Hard',
    },
    DEFAULT: {
      color: 'white',
      label: 'All',
    },
  };

export default function FilterButtonDifficulty() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQueryParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    // If 'difficulty' is being set or cleared, ensure page is reset to 1
    params.set('page', '1'); // Reset the page to 1

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`?${params.toString()}`);
  };

  const getCurrentDifficulty = (): QuestionDifficulty | 'DEFAULT' => {
    return (
      (searchParams.get('difficulty')?.toUpperCase() as QuestionDifficulty) ||
      'DEFAULT'
    );
  };

  const currentDifficulty = getCurrentDifficulty();
  const { color, label } = DIFFICULTY_MAP[currentDifficulty];

  const handleFilterClick = (difficulty: QuestionDifficulty) => {
    // Clear the filter if the current difficulty is clicked again
    if (currentDifficulty === difficulty) {
      updateQueryParams('difficulty', null);
    } else {
      updateQueryParams('difficulty', difficulty.toLowerCase());
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          padding="sm"
          className="flex items-center gap-x-2.5 text-xs group"
        >
          <div
            className="size-1.5 ml-1 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span>Difficulty</span>
          <ChevronDown className="size-3 duration-200 group-data-[state=open]:-rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="!p-0 w-40 bg-black border border-black-50 text-white text-sm"
      >
        <DropdownMenuGroup className="p-1">
          {Object.entries(DIFFICULTY_MAP).map(
            ([key, { color, label }]) =>
              key !== 'DEFAULT' && (
                <DropdownMenuItem
                  key={key}
                  asChild
                  className="hover:!text-white hover:cursor-pointer"
                >
                  <button
                    onClick={() => handleFilterClick(key as QuestionDifficulty)}
                    className="h-full w-full text-left flex items-center gap-x-2"
                  >
                    <div
                      className="size-2 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    {label}
                    {currentDifficulty === key && (
                      <Check className="size-3 text-white" />
                    )}
                  </button>
                </DropdownMenuItem>
              )
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
