'use client';

import { Input } from '@/components/ui/input';
import { useFilterContext } from '../../../../contexts/filter-context';
import { useTransition } from 'react';
import LoadingSpinner from '@/components/ui/loading';

export default function FilterSearchTag() {
  const { searchQuery, setSearchQuery } = useFilterContext();

  const [isPending, startTransition] = useTransition();

  return (
    <div className="relative">
      <Input
        type="search"
        placeholder="Search tags..."
        value={searchQuery}
        onChange={(e) => startTransition(() => setSearchQuery(e.target.value))}
        className="h-10 max-w-xs bg-transparent text-white placeholder:text-gray-400 border border-black-50 pl-8"
      />
      {isPending ? (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4">
          <LoadingSpinner />
        </div>
      ) : (
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      )}
    </div>
  );
}
