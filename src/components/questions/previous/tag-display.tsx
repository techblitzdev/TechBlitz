import Chip from '@/components/global/chip'; // Assuming this is your Chip component
import { Tags } from '@/types/Tags';
import { capitalise } from '@/utils';

export default function TagDisplay(opts: { tags: Tags[] }) {
  const { tags } = opts;

  const visibleTags = tags.slice(0, 3);
  const remainingCount = Math.max(0, tags.length - 3);

  return (
    <div className="space-y-0.5 text-start">
      <div className="flex items-center gap-1">
        {visibleTags.map((tag) => (
          <Chip
            key={tag.tagId}
            color="accent"
            text={capitalise(tag.tag.name)}
          />
        ))}
        {remainingCount > 0 && (
          <Chip color="accent" text={`+${remainingCount}`} />
        )}
      </div>
    </div>
  );
}
