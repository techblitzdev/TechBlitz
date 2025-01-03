import Chip from '@/components/ui/chip'; // Assuming this is your Chip component
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
      name: tag.tag.name.replace(/-/g, ' '),
    },
  }));

  // set text colour based on variant
  const textColor = variant === 'accent' ? 'text-white' : 'text-black';

  return (
    <div className="space-y-0.5 text-start">
      <div className="flex items-center gap-2 flex-wrap">
        {visibleTags.map((tag, idx) => {
          return (
            <Chip
              key={`${tag.tagId}-${idx}`}
              color={`bg-${variant}`}
              text={capitalise(tag.tag.name)}
              textColor={textColor}
              border={`border-${variant}`}
              bold={false}
            />
          );
        })}
        {remainingCount > 0 && (
          <Chip
            color={`bg-${variant}`}
            text={`+${remainingCount}`}
            textColor={textColor}
            border={`border-${variant}`}
            bold={false}
          />
        )}
      </div>
    </div>
  );
}
