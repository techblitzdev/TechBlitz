import Chip from '@/components/global/chip';
import { Grid } from '@/components/ui/grid';
import { UserRoadmapsWithAnswers } from '@/types/Roadmap';
import { capitalise } from '@/utils';

export default function RoadmapHeroSection(opts: {
  roadmap: UserRoadmapsWithAnswers;
}) {
  return (
    <section className="w-full py-10 group relative">
      <div className="container flex flex-col px-16">
        <div className="flex w-full justify-between gap-3">
          <div className="flex flex-col gap-y-3 font-inter max-w-3xl">
            <h1 className="text-3xl text-wrap text-start font-inter">
              {opts.roadmap.title}
            </h1>
            {opts.roadmap.description && (
              <h6 className="text-sm text-gray-400 font-inter">
                {opts.roadmap?.description}
              </h6>
            )}
          </div>
        </div>
        <div className="mt-5 w-fit flex gap-3 z-10">
          <div className="flex items-center gap-x-3">
            {opts.roadmap?.status && (
              <Chip
                text={capitalise(opts.roadmap.status)}
                color="black-100"
                border="black-50"
              />
            )}
          </div>
          <Chip
            text={opts.roadmap?.questions.length.toString() + ' ' + 'Questions'}
            color="white"
            textColor="black"
          />
        </div>
      </div>
      <Grid
        size={20}
        position="bottom-left"
      />
      {/* Fade-out gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none"></div>
    </section>
  );
}
