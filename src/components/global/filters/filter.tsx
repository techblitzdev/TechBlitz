'use client';
import { useState } from 'react';

import FilterButtonsSort from '@/components/global/filters/buttons/sort/date';
import FilterButtonDifficulty from '@/components/global/filters/buttons/filter/difficulty';
import FilterButtonCompleted from '@/components/global/filters/buttons/filter/completed';
import FilterTagsCarousel from '@/components/global/filters/tags-carousel';
import FilterSearchTag from '@/components/global/filters/search/tag-search';
import { Tag } from '@prisma/client';

interface FilterProps {
  tags: Tag[];
}

export default function Filter({ tags }: FilterProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 w-full justify-between">
        <div className="flex flex-wrap gap-2 items-end">
          <FilterButtonDifficulty />
          <FilterButtonCompleted />
          <FilterSearchTag value={searchQuery} onChange={setSearchQuery} />
        </div>
        <FilterButtonsSort />
      </div>
      <FilterTagsCarousel tags={tags} searchQuery={searchQuery} />
    </div>
  );
}
