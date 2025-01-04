import { getTags } from '@/actions/questions/tags/get-tags';
import Filter from './filter';

export default async function FiltersWrapper() {
  const tags = await getTags();

  return (
    <>
      <Filter tags={tags} />
    </>
  );
}
