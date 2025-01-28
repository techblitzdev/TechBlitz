import FilterTagsCarousel from '@/components/app/filters/tags-carousel';
import FilterSearchTag from '@/components/app/filters/search/tag-search';
import { Tag } from '@prisma/client';
import { FilterContextProvider } from './filter-context';
import { use } from 'react';
import FilterDropdown from './filter-dropdown';
import SortDropdown from './sort/sort-dropdown';

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
            <FilterDropdown />
            <FilterSearchTag />
          </div>
          {showSort && <SortDropdown />}
        </div>
        <FilterTagsCarousel />
      </div>
    </FilterContextProvider>
  );
}
