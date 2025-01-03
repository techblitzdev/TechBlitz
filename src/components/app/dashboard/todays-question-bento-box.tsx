import Chip from '@/components/ui/chip';
import { Button } from '@/components/ui/button';
import TagDisplay from '@/components/app/questions/previous/tag-display';
import NoDailyQuestion from '@/components/global/errors/no-daily-question';
import { ArrowUpRight } from 'lucide-react';

import { getQuestionDifficultyColor, capitalise } from '@/utils';
import { Question } from '@/types/Questions';

export default function TodaysQuestionBentoBox(opts: {
  question: Question | null;
}) {
  const { question } = opts;

  if (!question)
    return (
      <div className="p-4">
        <NoDailyQuestion variant="accent" />
      </div>
    );

  const tags = question?.tags || [];

  return (
    <section className="flex flex-col justify-between p-4 h-full group relative gap-y-4">
      <div className="flex w-full justify-between">
        <div className="space-y-1">
          <h6 className="text-xl">Today's Question </h6>
          <p className="text-xs font-onest">
            Answer today's question to keep your streak <br /> going!
          </p>
        </div>
        <Button variant="accent" className="size-10" padding="none">
          <ArrowUpRight className="size-5 group-hover:rotate-45 duration-300" />
        </Button>
      </div>
      <div className="flex flex-wrap space-y-2 w-full items-end justify-between">
        <div className="space-y-1">
          <h6>Topics:</h6>
          <div className="flex gap-x-2 mt-2">
            <TagDisplay tags={tags} numberOfTags={2} variant="secondary" />
          </div>
        </div>
        <Chip
          color={getQuestionDifficultyColor(question.difficulty).bg}
          text={capitalise(question.difficulty)}
          textColor={getQuestionDifficultyColor(question.difficulty).text}
          border={getQuestionDifficultyColor(question.difficulty).border}
        />
      </div>
    </section>
  );
}
