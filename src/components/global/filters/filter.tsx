import FilterButtonsSort from './buttons/sort/date';
import FilterButtonDifficulty from './buttons/filter/difficulty';
import FilterButtonCompleted from './buttons/filter/completed';
import FilterButtonTags from './buttons/filter/tags';
import { getTags } from '@/actions/questions/tags/get-tags';

export default async function Filter() {
  // fetch all of the tags from the db
  const tags = await getTags();

  return (
    <div className="flex gap-2 w-full justify-between">
      {/* <Button variant="secondary" className="flex items-center gap-x-2">
        <FilterIcon className="size-4" />
        Filter
        <ChevronDown className="size-3" />
      </Button> */}
      <div className="flex flex-wrap gap-2 items-end">
        <FilterButtonTags tags={tags} />
        <FilterButtonDifficulty />
        <FilterButtonCompleted />
      </div>
      <div>
        <FilterButtonsSort />
      </div>
    </div>
  );
}
