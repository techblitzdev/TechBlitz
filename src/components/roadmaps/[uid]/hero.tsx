import Chip from '@/components/global/chip';
import { Button } from '@/components/ui/button';
import { Grid } from '@/components/ui/grid';
import { UserRoadmapsWithAnswers } from '@/types/Roadmap';
import { capitalise } from '@/utils';
import { ArrowUpRight } from 'lucide-react';

export default function RoadmapHeroSection(opts: {
  roadmap: UserRoadmapsWithAnswers;
}) {
  return (
    <div className="w-full py-16 group relative">
      <div className="container flex flex-col px-16">
        <div className="flex w-full justify-between gap-3">
          <div className="flex flex-col gap-y-3 font-ubuntu max-w-3xl">
            <h6 className="text-3xl text-wrap text-start">
              {opts.roadmap.title}
            </h6>
            {opts.roadmap.description && (
              <p className="text-sm text-gray-400">
                {opts.roadmap?.description}
              </p>
            )}
          </div>
        </div>
        <div className="mt-5 w-fit flex gap-3">
          <Chip
            text={opts.roadmap?.questions.length.toString() + ' ' + 'Questions'}
            color="white"
            textColor="black"
          />
          <div className="flex items-center gap-x-3">
            {opts.roadmap?.status && (
              <Chip
                text={capitalise(opts.roadmap.status)}
                color="black-100"
                border="black-50"
              />
            )}
          </div>
        </div>
      </div>
      <Grid
        size={20}
        position="bottom-left"
      />
    </div>
  );
}
