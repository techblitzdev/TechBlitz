import FilterButtonsSort from './buttons/sort/date';
import FilterButtonDifficulty from './buttons/filter/difficulty';
import FilterButtonCompleted from './buttons/filter/completed';
import FilterTagsContainer from './tags-carousel-container';

export default function Filter() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 w-full justify-between">
        <div className="flex flex-wrap gap-2 items-end">
          <FilterButtonDifficulty />
          <FilterButtonCompleted />
        </div>
        <FilterButtonsSort />
      </div>
      <FilterTagsContainer />
    </div>
  );
}
