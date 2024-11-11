import { Question } from '@/types/Questions';
import Chip from '../global/chip';
import { capitalise } from '@/utils';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Grid } from '../ui/grid';
import { getQuestionDifficultyColor } from '@/utils';

export default function TodaysQuestionBentoBox(opts: { question: Question }) {
  const { question } = opts;

  // get the question tags from the question - only choose the first 3
  const tags = question?.tags?.map((tag) => tag.tag.name).slice(0, 3) || [];

  return (
    <section className="flex flex-col justify-between p-4 h-full group relative gap-y-4">
      <div className="flex w-full justify-between">
        <div className="space-y-1">
          <h6 className="text-xl">Today's Question </h6>
          <p className="text-xs font-satoshi">
            Answer today's question to keep your streak <br /> going!
          </p>
        </div>
        <Button variant="accent" className="size-10" padding="none">
          <ArrowUpRight className="size-5 group-hover:rotate-45 duration-300" />
        </Button>
        {/* <ArrowRight className="size-4 ml-1 group-hover:ml-2 duration-300" /> */}
      </div>
      <div className="flex flex-wrap space-y-2 w-full items-end justify-between">
        <div className="space-y-1">
          <h6>Topics:</h6>
          <div className="flex gap-x-2 mt-2">
            {tags?.map((tag) => (
              <Chip
                key={tag}
                color="white"
                textColor="black"
                text={capitalise(tag)}
                bold={false}
              />
            ))}
          </div>
        </div>
        <Chip
          color={getQuestionDifficultyColor(question.difficulty)}
          text={capitalise(question.difficulty)}
          textColor={getQuestionDifficultyColor(question.difficulty)}
          ghost
        />
      </div>
    </section>
  );
}
