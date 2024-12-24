import { QuestionWithoutAnswers } from '@/types/Questions';
import { cn } from '@/utils/cn';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function RelatedQuestionCard(opts: {
  question: QuestionWithoutAnswers;
  index: number;
}) {
  const { question, index } = opts;
  return (
    <Link
      href={`/questions/${question.uid}`}
      className={cn(
        'px-4 py-3 w-full flex justify-between items-center group',
        index % 2 === 0
          ? 'bg-black hover:bg-black-75'
          : 'bg-black-75 hover:bg-black-100'
      )}
    >
      <p className="text-sm">{question.question}</p>
      <ArrowRight className="size-4 mr-1 group-hover:mr-0 duration-300 flex-shrink-0" />
    </Link>
  );
}
