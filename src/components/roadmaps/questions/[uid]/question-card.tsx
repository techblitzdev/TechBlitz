import Chip from '@/components/global/chip';
import { Button } from '@/components/ui/button';
import { Grid } from '@/components/ui/grid';
import { RoadmapUserQuestions } from '@/types/Roadmap';
import { capitalise, getQuestionDifficultyColor } from '@/utils';
import { cn } from '@/utils/cn';
import { ArrowUpRight, Check, X } from 'lucide-react';
import Link from 'next/link';

export default function RoadmapQuestionCard(opts: {
  question: RoadmapUserQuestions;
  roadmapUid: string;
  index: number;
  totalQuestions: number;
  nextQuestionCorrect?: boolean;
  nextQuestionAnswered?: boolean;
  prevQuestionCorrect?: boolean;
  prevQuestionAnswered?: boolean;
}) {
  const {
    question,
    roadmapUid,
    index,
    totalQuestions,
    prevQuestionCorrect,
    prevQuestionAnswered
  } = opts;

  return (
    <div className="relative flex gap-7">
      <div
        className={cn(
          'relative flex flex-col items-center w-0.5',
          index === totalQuestions - 1 && 'pb-6'
        )}
      >
        {/* Top line */}
        <div
          className={cn(
            'bg-black-50 w-0.5 relative h-1/2',
            index === 0 && 'opacity-0', // First question has no top line
            question?.completed && question?.userCorrect && 'bg-green-500',
            question?.completed && !question?.userCorrect && 'bg-destructive',
            prevQuestionAnswered && !prevQuestionCorrect && 'bg-destructive',
            prevQuestionCorrect && 'bg-green-500'
          )}
        />

        {/* Dot */}
        <div
          className={cn(
            'size-3 rounded-full bg-black-50', // Default dot
            question?.completed && question?.userCorrect && 'bg-green-500',
            question?.completed && !question?.userCorrect && 'bg-destructive'
          )}
        />

        {/* Bottom line */}
        <div
          className={cn(
            'bg-black-50 w-0.5 relative h-1/2',
            index === totalQuestions - 1 && 'opacity-0', // Last question has no bottom line
            question?.completed && question?.userCorrect && 'bg-green-500',
            question?.completed && !question?.userCorrect && 'bg-destructive'
          )}
        />
      </div>
      <Link
        href={`/roadmap/${roadmapUid}/${question.uid}`}
        key={question.uid}
        className="py-6 mb-6 space-y-5 items-start border border-black-50 p-5 rounded-lg group w-full h-auto flex flex-col relative overflow-hidden"
      >
        <div className="flex flex-col w-full">
          <div className="flex w-full justify-between gap-3">
            <h6 className="text-base text-wrap text-start">
              {question.question}
            </h6>
            <Button
              variant="accent"
              className="size-10"
              padding="none"
            >
              <ArrowUpRight className="size-5 group-hover:rotate-45 duration-300" />
            </Button>
          </div>
        </div>

        <div className="mt-5 w-full flex justify-between items-end">
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
          {/** if the user has answered the question or not */}
          <div className="flex items-center gap-x-1 font-ubuntu">
            {/** display if the user has already answered the question or not */}
            {question?.completed && (
              <>
                {question?.userCorrect ? (
                  <Check className="size-4 text-green-500" />
                ) : (
                  <X className="size-4 text-destructive" />
                )}
                <div className="flex items-center gap-2">
                  <p className="text-sm">Answered</p>
                </div>
              </>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
