import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export default function FeatureRoadmapHeroBlock() {
  return (
    <section className="pt-32 lg:pt-52 pb-16">
      <div className="flex flex-col gap-y-3 items-center md:items-start">
        <h1 className="text-5xl lg:text-7xl !font-onest !font-medium tracking-tight  text-gradient from-white to-white/75 text-center md:text-start">
          AI-Powered Developer <br /> Roadmaps
        </h1>
        <h6 className="text-gray-400 max-w-xl text-center md:text-start text-sm md:text-base">
          Create personalized learning paths with our AI-driven roadmap feature
          to master skills and advance your career as a software engineer.
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
    </section>
  );
}
