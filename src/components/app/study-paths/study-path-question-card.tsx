import { Question } from '@/types/Questions';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { CheckCircle, Circle, XCircle } from 'lucide-react';
import { useUserServer } from '@/hooks/use-user-server';
import Lock from '@/components/ui/icons/lock';

export default async function StudyPathQuestionCard({
  questionData,
  href,
  className,
}: {
  questionData: Question;
  href: string;
  className?: string;
}) {
  const user = await useUserServer();

  const title = questionData?.title || questionData?.question;
  const userCanAccess = user?.userLevel === 'PREMIUM' || !questionData?.isPremiumQuestion;

  return (
    <Link
      href={href}
      key={questionData.uid}
      className={cn(
        'flex flex-col gap-y-5 items-start bg-[#090909] border border-black-50 hover:border-black-100 duration-300 p-5 rounded-lg group w-full relative overflow-hidden group-has-[[data-pending]]:animate-pulse',
        className
      )}
    >
      <div className="flex w-full items-center justify-between gap-4 md:gap-5">
        <div className="flex items-center gap-x-2">
          {questionData.userAnswers && questionData.userAnswers.length > 0 ? (
            questionData.userAnswers[0].correctAnswer ? (
              <CheckCircle className="flex-shrink-0 size-5 text-green-500" />
            ) : (
              <XCircle className="flex-shrink-0 size-5 text-red-500" />
            )
          ) : (
            <Circle className="flex-shrink-0 size-5 text-black-50" />
          )}
          <h6 className="text-lg text-wrap text-start line-clamp-1 flex-grow">{title}</h6>
        </div>
        {!userCanAccess && (
          <div className="h-fit">
            <Lock height="20" width="20" />
          </div>
        )}
      </div>
    </Link>
  );
}
