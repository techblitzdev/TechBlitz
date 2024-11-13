import type { QuestionWithoutAnswers } from '@/types/Questions';
import { cn } from '@/utils/cn';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export default function PreviousQuestionSuggestedCard(opts: {
  questions?: QuestionWithoutAnswers[];
  isLoading: boolean;
}) {
  const { questions, isLoading } = opts;

  if (isLoading) {
    return (
      <div className="flex flex-col bg-black-100 border overflow-hidden border-black-50 rounded-md divide-y-[1px] divide-black-50">
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="flex w-full justify-between items-center p-3">
            <Skeleton key={index} className="bg-black h-6 w-3/4" />
            <ArrowRight className="size-3 mr-1" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-black-100 border overflow-hidden border-black-50 rounded-md divide-y-[1px] divide-black-50">
      {questions?.map((question, index) => (
        <Link
          key={question.uid}
          className={cn(
            'p-3 truncate w-full flex justify-between items-center group',
            index % 2 === 0
              ? 'bg-black-75 hover:bg-black-100'
              : 'bg-black hover:bg-black-75'
          )}
          href={`/question/${question.uid}`}
        >
          <p className="text-sm font-satoshi">
            {question.question.length > 40
              ? `${question.question.substring(0, 40)}...`
              : question.question}
          </p>
          <ArrowRight className="size-3 mr-1 group-hover:mr-0 duration-300" />
        </Link>
      ))}
    </div>
  );
}
