import FilterButtonsSort from './buttons/sort/date';
import FilterButtonDifficulty from './buttons/filter/difficulty';
import FilterButtonCompleted from './buttons/filter/completed';
import FilterButtonTags from './buttons/filter/tags';

export default function Filter() {
  return (
    <div className="flex gap-x-2 w-full justify-between">
      {/* <Button variant="secondary" className="flex items-center gap-x-2">
        <FilterIcon className="size-4" />
        Filter
        <ChevronDown className="size-3" />
      </Button> */}
      <div className="flex gap-x-2 items-end">
        <FilterButtonTags />
        <FilterButtonDifficulty />
        <FilterButtonCompleted />
      </div>
      <div>
        <FilterButtonsSort />
      </div>
    </div>
  );
}
