import { Grid } from '@/components/ui/grid';
import { Highlight } from '@/components/ui/highlight';
import { cn } from '@/utils/cn';
import { RouteIcon } from 'lucide-react';

const cardClasses = 'border border-black-50 p-6';

export default function FeaturesBentoGrid() {
  return (
    <div className="pt-28 pb-20 flex flex-col gap-y-5 relative">
      <div className="flex flex-col gap-y-2 items-center text-center">
        <h1 className="text-2xl lg:text-4xl !font-onest !leading-[normal] text-gradient from-white to-white/55">
          Software engineering is easy{' '}
        </h1>
        <span className="text-xs text-gradient from-white to-white/55">
          (with us)
        </span>
      </div>
      <div
        className="card-wrapper h-[350px]
      "
      >
        <div className="card-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-[#000000]">
          <div
            className={cn(
              'col-span-full lg:col-span-2 !border-r-0 !border-b-0 relative overflow-hidden',
              cardClasses
            )}
          >
            <div className="flex flex-col gap-y-1">
              <h6 className="text-2xl text-gradient from-white to-white/55">
                AI Powered Progression Paths
              </h6>
              <p className="text-xs text-gray-400">
                Our AI powered roadmap will help you take the next step in your
                developer journey.
              </p>
            </div>
            <Grid
              size={20}
              position="top-right"
            />
          </div>
          <div className={cn('!border-b-0', cardClasses)}>
            <div className="flex flex-col gap-y-2">
              <h6 className="text-2xl text-gradient from-white to-white/55">
                Daily questions
              </h6>
              <p className="text-xs text-gray-400">
                Daily questions will help you reinforce your learning and
                understand concepts.
              </p>
            </div>
          </div>
          <div className={cn('!border-r-0', cardClasses)}>
            <h6 className="text-2xl text-gradient from-white to-white/55">
              Leaderboard
            </h6>
          </div>
          <div className={cn('col-span-full lg:col-span-2', cardClasses)}>
            <h6 className="text-2xl text-gradient from-white to-white/55">
              Progress tracking
            </h6>
          </div>
        </div>
      </div>
      {/* Fade-out gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none"></div>
    </div>
  );
}
