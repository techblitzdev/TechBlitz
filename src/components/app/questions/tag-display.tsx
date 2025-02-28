import Chip from '@/components/ui/chip'; // Assuming this is your Chip component
import { Tags } from '@/types/Tags';
import { capitalise } from '@/utils';
import { cva } from 'class-variance-authority';

const tagVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 font-onest',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 border border-black-50',
        destructive: 'bg-red-600 text-destructive-foreground shadow-xs hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        accent: 'bg-accent text-white shadow-xs hover:bg-accent/90',
      },
    },
  }
);

export default function TagDisplay(opts: {
  tags: Tags[];
  numberOfTags?: number;
  variant?: 'default' | 'outline' | 'secondary' | 'destructive' | 'accent';
  // the tag we want to have at the top of the list
  showcaseTag?: string;
}) {
  const { tags, numberOfTags = 3, variant = 'accent', showcaseTag } = opts;

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

  // if the showcase tag is in the list, move it to the top
  if (showcaseTag && visibleTags.some((tag) => tag.tag.name === showcaseTag)) {
    const showcaseTagIndex = visibleTags.findIndex((tag) => tag.tag.name === showcaseTag);
    visibleTags.splice(showcaseTagIndex, 1);
    visibleTags.unshift({
      tag: { name: showcaseTag, uid: '' },
      questionId: '',
      tagId: '',
    });
  }

  // set text colour based on variant
  const textColor = variant === 'accent' ? 'text-white' : 'text-black';

  // if the variant is default, configure the styles
  if (variant === 'default') {
  }

  return (
    <div className="space-y-0.5 text-start">
      <div className="flex items-center gap-2 flex-wrap">
        {visibleTags.map((tag, idx) => {
          return (
            <Chip
              key={`${tag.tagId}-${idx}`}
              color={tagVariants({ variant })}
              text={capitalise(tag.tag.name)}
              textColor={textColor}
              border={tagVariants({ variant })}
              bold={false}
            />
          );
        })}
        {remainingCount > 0 && (
          <Chip
            color={tagVariants({ variant })}
            text={`+${remainingCount}`}
            textColor={textColor}
            border={tagVariants({ variant })}
            bold={false}
          />
        )}
      </div>
    </div>
  );
}
