import dynamic from 'next/dynamic';

import FilterButtonsSort from '@/components/global/filters/buttons/sort/date';
const FilterButtonDifficulty = dynamic(
  () => import('@/components/global/filters/buttons/filter/difficulty'),
  { ssr: false }
);
import FilterButtonCompleted from '@/components/global/filters/buttons/filter/completed';
import FilterTagsCarousel from '@/components/global/filters/tags-carousel';
import FilterSearchTag from '@/components/global/filters/search/tag-search';
import { Tag } from '@prisma/client';
import { FilterContextProvider } from './filter-context';
import { use } from 'react';

interface FilterProps {
  tagsPromise: Promise<Tag[]>;
  showSort?: boolean;
}

export default function Filter({ tagsPromise, showSort = true }: FilterProps) {
  const tags = use(tagsPromise);

  return (
    <FilterContextProvider tags={tags}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-2 w-full justify-between">
          <div className="flex flex-wrap gap-2 items-end order-last md:order-first">
            <FilterButtonDifficulty />
            <FilterButtonCompleted />
            <FilterSearchTag />
          </div>
          {showSort && <FilterButtonsSort />}
        </div>
        <FilterTagsCarousel />
      </div>
    </FilterContextProvider>
  );
}
