import type { QuestionWithoutAnswers } from '@/types/Questions';
import { shortenText } from '@/utils';
import { cn } from '@/utils/cn';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function QuestionSuggestedCard(opts: {
  questions?: QuestionWithoutAnswers[];
  border?: boolean;
}) {
  const { questions, border = true } = opts;

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
            {shortenText(question.question, 35)}
          </p>
          <ArrowRight className="size-3 mr-1 group-hover:mr-0 duration-300 flex-shrink-0" />
        </Link>
      ))}
    </div>
  );
}
