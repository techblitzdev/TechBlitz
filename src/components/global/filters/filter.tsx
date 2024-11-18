import { Button } from '@/components/ui/button';
import {
  Filter as FilterIcon,
  ArrowDownNarrowWide,
  ChevronDown,
  Calendar,
  Tag,
  Check,
} from 'lucide-react';
import FilterButtonsSort from './buttons/sort/date';
import FilterButtonDifficulty from './buttons/filter/difficulty';
import FilterButtonCompleted from './buttons/filter/completed';

export default function Filter() {
  return (
    <div className="flex gap-x-2 w-full justify-between">
      {/* <Button variant="secondary" className="flex items-center gap-x-2">
        <FilterIcon className="size-4" />
        Filter
        <ChevronDown className="size-3" />
      </Button> */}
      <div className="flex gap-x-2 items-end">
        <Button
          padding="sm"
          variant="default"
          size="sm"
          className="flex items-center gap-x-1 text-xs"
        >
          <Tag className="size-4" />
          All tags
          <ChevronDown className="size-3" />
        </Button>
        <FilterButtonDifficulty />
        <FilterButtonCompleted />
      </div>
      <div>
        <FilterButtonsSort />
      </div>
    </div>
  );
}
