import ChangelogTimeline from '@/components/marketing/misc/changelog-timeline';
import { GridPattern } from '@/components/ui/grid';
import { cn } from '@/lib/utils';

export default function ChangelogPage() {
  return (
    <div>
      <section className="relative flex gap-10 text-white overflow-hidden justify-center">
        <div className="flex flex-col gap-y-6 w-full xl:w-2/5 pt-32 lg:pt-52 pb-8 z-10 items-center">
          <h1
            className="
            text-5xl lg:text-7xl !font-onest font-bold tracking-tight py-1.5 text-center
            text-transparent bg-clip-text bg-gradient-to-r from-white to-white/75 leading-tight
          "
          >
            Changelog
          </h1>

          <p className="text-white/70 max-w-xl text-base font-onest text-center">
            View the latest updates and improvements to our platform. We're always working to
            improve your experience and make learning more enjoyable.
          </p>
        </div>

        <GridPattern
          width={50}
          height={50}
          x={-1}
          y={-1}
          strokeDasharray={'4 2'}
          className={cn(
            'absolute inset-0 pt-44 [mask-image:radial-gradient(400px_circle_at_center,white,transparent)]'
          )}
        />
        <div className="z-10 absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#000] to-transparent pointer-events-none"></div>
      </section>
      <ChangelogTimeline />
    </div>
  );
}
