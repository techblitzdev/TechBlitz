import { UserRoadmaps } from '@/types/Roadmap';
import Link from 'next/link';
import { Grid } from '../../ui/grid';
import { Button } from '../../ui/button';
import { ArrowUpRight } from 'lucide-react';
import Chip from '../../global/chip';
import { capitalise } from '@/utils';

export default function RoadmapsCard(opts: { roadmap: UserRoadmaps }) {
  const { roadmap } = opts;

  const href =
    roadmap.status === 'ACTIVE' || roadmap.status === 'COMPLETED'
      ? `/roadmap/${roadmap.uid}`
      : `/roadmap/${roadmap.uid}/onboarding/${roadmap.currentQuestionIndex}`;

  return (
    <Link
      href={href}
      className="py-6 mb-6 space-y-5 items-start border border-black-50 p-5 rounded-lg group w-full h-auto flex flex-col relative overflow-hidden"
    >
      <div className="flex w-full justify-between gap-3">
        <div className="flex flex-col gap-y-3 font-ubuntu">
          <h6 className="text-base text-wrap text-start">{roadmap.title}</h6>
          {roadmap.description && (
            <p className="text-sm">
              {roadmap?.description?.length > 100
                ? `${roadmap?.description.slice(0, 100)}...`
                : roadmap?.description || ''}
            </p>
          )}
        </div>
        <Button
          variant="accent"
          className="size-10"
          padding="none"
        >
          <ArrowUpRight className="size-5 group-hover:rotate-45 duration-300" />
        </Button>
      </div>
      <div className="mt-5 w-full flex justify-between items-end relative z-10">
        <Chip
          text={roadmap?.questions.length.toString() + ' ' + 'Questions'}
          color="white"
          textColor="black"
        />
        <div className="flex items-center gap-x-3">
          {roadmap?.status && (
            <Chip
              text={capitalise(roadmap.status)}
              color="black-100"
              border="black-50"
            />
          )}
        </div>
      </div>
      <Grid
        size={20}
        position="bottom-right"
      />
    </Link>
  );
}
