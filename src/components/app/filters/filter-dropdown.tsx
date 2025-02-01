'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu'
import MaterialSymbolsFilterListRounded from '@/components/ui/icons/filter'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'
import { capitalise } from '@/utils'
import { Check } from 'lucide-react'

type QuestionDifficulty = 'BEGINNER' | 'EASY' | 'MEDIUM' | 'HARD'

interface DifficultyConfig {
  color: string
  label: string
}

const DIFFICULTY_MAP: Record<QuestionDifficulty | 'DEFAULT', DifficultyConfig> =
  {
    BEGINNER: {
      color: '#2563eb33',
      label: 'Beginner',
    },
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
  }

export default function FilterDropdown() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const [showDifficulty, setShowDifficulty] = useState(false)
  const [showQuestionType, setShowQuestionType] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const answeredFilter = searchParams.get('answered')
  const difficultyFilter = searchParams.get('difficulty')
  const questionTypeFilter = searchParams.get('questionType')

  const updateQueryParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', '1')

    if (
      value === null ||
      (key === 'answered' && value === answeredFilter) ||
      (key === 'difficulty' && value === difficultyFilter) ||
      (key === 'questionType' && value === questionTypeFilter)
    ) {
      params.delete(key)
    } else {
      params.set(key, value)
    }

    startTransition(() => {
      router.push(`?${params.toString()}`)
    })
  }

  const clearAllFilters = () => {
    startTransition(() => {
      router.push('?page=1')
    })
  }

  // get the total number of active filters
  const activeFilters = [
    difficultyFilter,
    answeredFilter,
    questionTypeFilter,
  ].filter((filter) => filter !== null).length

  const getCurrentDifficulty = (): QuestionDifficulty | 'DEFAULT' => {
    return (
      (searchParams.get('difficulty')?.toUpperCase() as QuestionDifficulty) ||
      'DEFAULT'
    )
  }

  const currentDifficulty = getCurrentDifficulty()

  return (
    <div
      className="flex items-center space-x-2"
      data-pending={isPending ? '' : undefined}
    >
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            padding="md"
            variant="default"
            size="lg"
            className="flex items-center gap-x-2 text-sm group"
          >
            <MaterialSymbolsFilterListRounded className="size-5" />
            Filter
            {activeFilters > 0 && (
              <span className="text-[10px] bg-white text-black px-2 rounded-full mr-1">
                {activeFilters}
              </span>
            )}
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
                {Object.entries(DIFFICULTY_MAP).map(
                  ([key, { color, label }]) =>
                    key !== 'DEFAULT' && (
                      <DropdownMenuItem
                        key={key}
                        asChild
                        className="hover:!text-white hover:cursor-pointer"
                      >
                        <button
                          onClick={() =>
                            startTransition(() =>
                              updateQueryParams('difficulty', key),
                            )
                          }
                          className="h-full w-full text-left flex items-center gap-x-2"
                        >
                          <div
                            className="size-2 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                          <div className="flex items-center w-full justify-between">
                            {label}
                            {currentDifficulty === key && (
                              <Check className="size-3 text-white" />
                            )}
                          </div>
                        </button>
                      </DropdownMenuItem>
                    ),
                )}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem
              onClick={() =>
                updateQueryParams(
                  'answered',
                  answeredFilter === 'true' ? null : 'true',
                )
              }
              className="py-2 flex items-center hover:!text-white hover:cursor-pointer"
            >
              Answered
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
            <DropdownMenuItem
              onClick={() => updateQueryParams('bookmarked', 'true')}
              className="py-2 hover:!text-white hover:cursor-pointer"
            >
              Bookmarked
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => updateQueryParams('isPremiumQuestion', 'true')}
              className="py-2 hover:!text-white hover:cursor-pointer"
            >
              Premium
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => updateQueryParams('recommended', 'true')}
              className="py-2 hover:!text-white hover:cursor-pointer"
            >
              Recommended
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <div
            className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
              activeFilters > 0 ? 'max-h-14 p-2 pt-0' : 'max-h-0'
            }`}
          >
            <Button
              variant="destructive"
              size="sm"
              onClick={clearAllFilters}
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
