import FilterTagsCarousel from '@/components/app/filters/tags-carousel';
import FilterSearchTag from '@/components/app/filters/search/tag-search';
import { FilterContextProvider } from '@/contexts/filter-context';
import FilterDropdown from './filter-dropdown';
import SortDropdown from './sort/sort-dropdown';
import { getTags } from '@/utils/data/questions/tags/get-tags';
interface FilterProps {
  showSort?: boolean;
}

export default async function Filter({ showSort = true }: FilterProps) {
  const tags = await getTags();

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
