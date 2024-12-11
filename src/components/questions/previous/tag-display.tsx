import Chip from '@/components/global/chip'; // Assuming this is your Chip component
import { Tags } from '@/types/Tags';
import { capitalise } from '@/utils';

export default function TagDisplay(opts: {
  tags: Tags[];
  numberOfTags?: number;
  variant?: 'default' | 'outline' | 'secondary' | 'destructive' | 'accent';
}) {
  const { tags, numberOfTags = 3, variant = 'accent' } = opts;

  let visibleTags = tags.slice(0, numberOfTags);
  const remainingCount = Math.max(0, tags.length - numberOfTags);

  // remove any empty tags
  visibleTags = visibleTags.filter((tag) => tag.tag.name !== '');

  // convert '-' to ' '
  visibleTags = visibleTags.map((tag) => ({
    ...tag,
    tag: {
      ...tag.tag,
      name: tag.tag.name.replace(/-/g, ' ')
    }
  }));

  // set text colour based on variant
  const textColor = variant === 'accent' ? 'white' : 'black';

  return (
    <div className="space-y-0.5 text-start">
      <div className="flex items-center gap-2 flex-wrap">
        {visibleTags.map((tag) => (
          <Chip
            key={tag.tagId}
            color={variant}
            text={capitalise(tag.tag.name)}
            textColor={textColor}
            bold={false}
          />
        ))}
        {remainingCount > 0 && (
          <Chip
            color={variant}
            text={`+${remainingCount}`}
            textColor={textColor}
            bold={false}
          />
        )}
      </div>
    </div>
  );
}
