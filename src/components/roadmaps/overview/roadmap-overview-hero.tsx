import { Grid } from '@/components/ui/grid';
import { Target } from 'lucide-react';

export default function RoadmapOverviewHeroSection() {
  return (
    <section className="w-full py-10 group relative">
      <div className="container flex flex-col gap-y-3 z-10">
        <h1 className="text-3xl text-wrap text-start font-inter">Roadmaps</h1>
        <h6 className="text-sm text-gray-400 font-inter max-w-md">
          Welcome to your roadmap overview. Here you can view all of your
          roadmaps and their progress, as well as create new ones.
        </h6>
      </div>
      <Grid
        size={25}
        position="bottom-left"
      />

      {/* Fade-out gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none"></div>
    </section>
  );
}
