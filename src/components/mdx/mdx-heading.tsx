import { cn } from '@/utils/cn';

interface MdxHeadingProps {
  children: Readonly<React.ReactNode>;
  heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export default function MdxHeading({
  children,
  heading,
  ...props
}: MdxHeadingProps) {
  const Component = heading || 'h1';

  // create a map of heading: text-size
  const headingSizes: Record<typeof heading, string> = {
    h1: 'text-5xl',
    h2: 'text-4xl',
    h3: 'text-3xl',
    h4: 'text-2xl',
    h5: 'text-xl',
    h6: 'text-lg',
  };

  // get the headingSize for the component passed in
  const headingSize = headingSizes[heading];

  return (
    <Component className={cn('font-bold mt-10 mb-5', headingSize)} {...props}>
      {children}
    </Component>
  );
}