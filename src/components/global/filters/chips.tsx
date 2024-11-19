'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { capitalise } from '@/utils';
import { cn } from '@/utils/cn';

export default function FilterChips() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Convert search params to an object
  const paramsObj = Object.fromEntries(
    searchParams.entries().filter(([key]) => key !== 'page')
  );

  const removeFilter = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (key === 'tags' && value) {
      // Handle array-based 'tags' parameter
      const updatedTags =
        params
          .get('tags')
          ?.split(',')
          .filter((tag) => tag !== value) || [];
      if (updatedTags.length > 0) {
        params.set('tags', updatedTags.join(','));
      } else {
        params.delete('tags');
      }
    } else {
      // Remove other single-value parameters
      params.delete(key);
    }

    router.push(`?${params.toString()}`);
  };

  if (Object.keys(paramsObj).length === 0) return null;

  // Render chips for each query parameter
  return (
    <div
      className={cn(
        'flex gap-2 flex-wrap duration-300',
        Object.keys(paramsObj).length === 0 ? 'h-0' : ''
      )}
    >
      {Object.entries(paramsObj).map(([key, value]) => {
        if (key === 'page') return null;
        // Handle 'tags' as a comma-separated list
        if (key === 'tags') {
          return (value.split(',') as string[]).map((tag) => (
            <div
              key={`${key}-${tag}`}
              className="flex items-center gap-2 px-3 py-1 text-xs border border-black-50 rounded-md hover:bg-black-25 duration-300"
            >
              <span>{capitalise(tag)}</span>
              <button
                onClick={() => removeFilter(key, tag)}
                className="bg-black-50 rounded-full p-0.5"
              >
                <X className="size-2.5" />
              </button>
            </div>
          ));
        }

        // Render chips for other parameters
        return (
          <div
            key={key}
            className="flex items-center gap-2 px-3 py-1 text-sm border border-black-50 rounded-md hover:bg-black-25 duration-300"
          >
            <span>{capitalise(value)}</span>
            <button
              onClick={() => removeFilter(key)}
              className="bg-black-50 rounded-full p-0.5"
            >
              <X className="size-2.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
