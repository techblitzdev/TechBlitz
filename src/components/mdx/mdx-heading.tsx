import { cn } from '@/lib/utils';

interface MdxHeadingProps {
  children: Readonly<React.ReactNode>;
  heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export default function MdxHeading({ children, heading, ...props }: MdxHeadingProps) {
  const Component = heading || 'h1';

  // create a map of heading: text-size
  const headingSizes: Record<typeof heading, string> = {
    h1: 'text-4xl',
    h2: 'text-3xl',
    h3: 'text-2xl',
    h4: 'text-xl',
    h5: 'text-lg',
    h6: 'text-base underline',
  };

  // get the headingSize for the component passed in
  const headingSize = headingSizes[heading];

  // Create an ID that handles numbered headings like "1. TechBlitz" properly
  const headingText = children?.toString() || '';
  // Replace periods following numbers with hyphens and remove other special characters
  const id = headingText
    .toLowerCase()
    .replace(/(\d+)\.(\s|$)/g, '$1-') // Replace "1." with "1-"
    .replace(/[^\w\s-]/g, '') // Remove special chars (except hyphens)
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Trim hyphens from start and end

  return (
    <Component id={id} className={cn('font-bold mt-10 mb-5', headingSize)} {...props}>
      {children}
    </Component>
  );
}
