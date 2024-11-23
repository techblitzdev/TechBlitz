import Chip from '@/components/global/chip';
import { Button } from '@/components/ui/button';
import { Grid } from '@/components/ui/grid';
import { RoadmapUserQuestions } from '@/types/Roadmap';
import { capitalise, getQuestionDifficultyColor } from '@/utils';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function RoadmapQuestionCard(opts: {
  question: RoadmapUserQuestions;
  roadmapUid: string;
}) {
  const { question, roadmapUid } = opts;

  return (
    <Link
      href={`/roadmap/${roadmapUid}/${question.uid}`}
      key={question.uid}
      className="space-y-5 items-start bg-black-75 border border-black-50 p-5 rounded-lg group w-full h-auto flex flex-col relative overflow-hidden"
    >
      <div className="flex flex-col w-full">
        <div className="flex w-full justify-between">
          <h6 className="text-base text-wrap text-start">
            {question.question}
          </h6>
          <Button variant="accent" className="size-10" padding="none">
            <ArrowUpRight className="size-5 group-hover:rotate-45 duration-300" />
          </Button>
        </div>
      </div>

      <div className="mt-5 w-full-justify-between items-end">
        <div className="flex items-center gap-x-3">
          {question?.difficulty && (
            <Chip
              text={capitalise(question.difficulty)}
              color={getQuestionDifficultyColor(question.difficulty)}
              textColor={getQuestionDifficultyColor(question.difficulty)}
              ghost
              small
            />
          )}
        </div>
      </div>
      <Grid size={20} position="bottom-right" />
    </Link>
  );
}
