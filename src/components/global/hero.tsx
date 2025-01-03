import { cn } from '@/utils/cn';
import { Grid } from '@/components/ui/grid';

export default function Hero(opts: {
  heading: string;
  subheading?: string;
  children?: React.ReactNode;
  container?: boolean;
}) {
  const { heading, subheading, children, container = true } = opts;

  return (
    <section className="w-full pt-14 pb-8 group relative">
      <div
        className={cn(
          'flex flex-col gap-y-3 z-10',
          container ? 'md:container' : ''
        )}
      >
        <h1 className="text-3xl text-wrap text-start font-inter max-w-2xl text-gradient from-white to-white/55">
          {heading}
        </h1>
        {subheading && (
          <h6 className="text-sm text-gray-400 font-inter max-w-xl z-50">
            {subheading}
          </h6>
        )}
        {children}
      </div>
      <Grid size={25} position="bottom-left" />

      {/* Fade-out gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none"></div>
    </section>
  );
}
