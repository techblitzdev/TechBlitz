import { Grid } from '@/components/ui/grid';
import { Highlight } from '@/components/ui/highlight';

export default function FeaturesBentoGrid() {
  return (
    <div className="pt-28 pb-20 flex flex-col gap-y-5 relative">
      <div className="flex flex-col gap-y-2 items-center text-center">
        <h1 className="text-xl lg:text-3xl !font-onest !font-medium !leading-[normal] text-gradient">
          Software engineering is easy{' '}
        </h1>
        <span className="text-xs text-gradient">(with us)</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 border border-black-50 p-4">
          AI Powered Progression Paths
        </div>
        <div className="col-span-1 border border-black-50 p-4">
          Daily questions
        </div>
        <div className="col-span-1 border border-black-50 p-4">Leaderboard</div>
        <div className="col-span-2 border border-black-50 p-4">
          Progress tracking
        </div>
      </div>
      {/* Fade-out gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none"></div>
    </div>
  );
}
