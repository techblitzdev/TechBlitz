import type { QuestionWithoutAnswers } from '@/types/Questions';
import { shortenText } from '@/utils';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function QuestionSuggestedCard(opts: {
  questions?: QuestionWithoutAnswers[];
  border?: boolean;
  textLimit?: number;
}) {
  const { questions, border = true, textLimit = 35 } = opts;

  if (!questions || questions.length === 0) {
    return (
      <div className="flex flex-col gap-y-4 items-center mt-4 border border-black-50 rounded-md p-4">
        <p className="text-sm font-medium text-gray-400">
          No questions answered, try answering 5 questions to get suggested
          questions!
        </p>
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
          <p className="text-sm font-satoshi line-clamp-1">
            {shortenText(question.question, textLimit)}
          </p>
          <ArrowRight className="size-3 mr-1 group-hover:mr-0 duration-300 flex-shrink-0" />
        </Link>
      ))}
    </div>
  );
}
