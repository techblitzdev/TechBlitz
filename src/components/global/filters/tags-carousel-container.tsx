import { getTags } from '@/actions/questions/tags/get-tags';
import FilterTagsCarousel from './tags-carousel';

export default async function FilterTagsContainer() {
  const tags = await getTags();

  return <FilterTagsCarousel tags={tags} />;
}
