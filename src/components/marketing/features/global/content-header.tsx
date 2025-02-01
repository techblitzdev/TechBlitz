import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function FeaturesContentHeader(opts: {
  title: string;
  description?: string | JSX.Element;
  id?: string;
  cta?: boolean;
}) {
  const { title, description, id, cta } = opts;

  return (
    <div id={id} className={cn('container mx-auto flex flex-col gap-y-3 items-center')}>
      <h2 className="text-3xl lg:text-5xl text-center text-gradient from-white to-white/75 !font-onest !font-medium tracking-tight py-1">
        {title}
      </h2>
      {description && (
        <p className="text-gray-400 max-w-4xl text-center text-base md:text-lg">{description}</p>
      )}
      {cta && (
        <Button variant="accent" className="mt-4" href="/features/roadmap" size="lg">
          Learn More
        </Button>
      )}
    </div>
  );
}
