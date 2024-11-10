import { Question } from '@/types/Questions';
import Chip from '../global/chip';
import { capitalise } from '@/utils';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/button';

export default function YesterdaysQuestionBentoBox(opts: {
  question: Question;
}) {
  const { question } = opts;

  // get the question tags from the question - only choose the first 3
  const tags = question?.tags?.map((tag) => tag.tag.name).slice(0, 3) || [];

  // border-green-500 border-yellow-500 border-red-500 text-green-500 text-yellow-500 text-red-500
  const getQuestionDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'EASY':
        return 'green-500';
      case 'MEDIUM':
        return 'yellow-500';
      case 'HARD':
        return 'red-500';
      default:
        return 'gray';
    }
  };

  return (
    <section className="flex flex-col justify-between h-full group relative">
      <div className="flex w-full justify-between">
        <Button variant="accent" className="size-10" padding="none">
          <ArrowDownLeft className="size-5 group-hover:rotate-45 duration-300" />
        </Button>
        <div className="space-y-1 text-end">
          <h6 className="text-xl">Yesterday's Question </h6>
          <p className="text-xs font-satoshi">
            Missed yesterday’s question? Answer now!
          </p>
        </div>
        {/* <ArrowRight className="size-4 ml-1 group-hover:ml-2 duration-300" /> */}
      </div>
      <div className="flex flex-wrap space-y-2 w-full items-end justify-between">
        {tags && tags.length > 0 && (
          <div className="space-y-1">
            <h6>Topics:</h6>
            <div className="flex gap-x-2 mt-2">
              {tags?.map((tag) => (
                <Chip
                  key={tag}
                  color="white"
                  textColor="black"
                  text={capitalise(tag)}
                />
              ))}
            </div>
          </div>
        )}
        <Chip
          color={getQuestionDifficultyColor(question?.difficulty)}
          text={capitalise(question?.difficulty)}
          textColor={getQuestionDifficultyColor(question?.difficulty)}
          ghost
        />
      </div>
    </section>
  );
}
