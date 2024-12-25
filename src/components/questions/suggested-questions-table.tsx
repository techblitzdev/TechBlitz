import type { QuestionWithoutAnswers } from '@/types/Questions';
import { cn } from '@/utils/cn';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export default function QuestionSuggestedCard(opts: {
  questions?: QuestionWithoutAnswers[];
  isLoading: boolean;
  border?: boolean;
}) {
  const { questions, isLoading, border = true } = opts;

  if (isLoading) {
    return (
      <div
        className={cn(
          'flex flex-col overflow-hidden divide-y-[1px] divide-black-50',
          border ? 'border border-black-50 rounded-md' : ''
        )}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex w-full justify-between items-center p-3"
          >
            <Skeleton className="bg-black h-6 w-3/4" />
            <ArrowRight className="size-3 mr-1" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden divide-y-[1px] divide-black-50',
        border ? 'border border-black-50 rounded-md' : ''
      )}
    >
      {questions?.map((question, index) => (
        <Link
          key={question.uid}
          className={cn(
            'p-3 truncate w-full flex justify-between items-center group',
            index % 2 === 0
              ? 'bg-[#000] hover:bg-black-100'
              : 'bg-black hover:bg-black-75'
          )}
          href={`/question/${question.uid}`}
        >
          <p className="text-sm font-satoshi">
            {question.question.length > 35
              ? `${question.question.substring(0, 35)}...`
              : question.question}
          </p>
          <ArrowRight className="size-3 mr-1 group-hover:mr-0 duration-300 flex-shrink-0" />
        </Link>
      ))}
    </div>
  );
}
