import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import GridPattern from '@/components/ui/grid-pattern';
import { cn } from '@/utils/cn';

export default function FeatureRoadmapHeroBlock() {
  return (
    <section className="pt-32 lg:pt-52 pb-16 relative">
      <div className="mt-28 z-10 absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#000] to-transparent pointer-events-none"></div>

      <div className="flex flex-col gap-y-3 items-center z-20 relative">
        <h1 className="text-5xl lg:text-7xl !font-onest !font-medium tracking-tight text-gradient from-white to-white/75 text-center">
          AI-Powered coding <br /> Roadmaps
        </h1>
        <h6 className="text-gray-400 max-w-xl text-center text-sm md:text-base">
          Create personalized learning paths with our AI-driven roadmap
          functionality to master skills and advance your career as a software
          engineer.
        </h6>
        <div className="mt-2">
          <Button
            href="/signup?src=features-roadmap"
            className="font-onest !bg-gradient-to-r !from-accent !via-accent/70 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors"
          >
            Try it now
            <ChevronRight
              size={16}
              className="ml-2"
            />
          </Button>
        </div>
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
  );
}
