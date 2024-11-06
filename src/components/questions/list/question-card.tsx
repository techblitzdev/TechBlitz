import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Question } from '@/types/Questions';
import { UserRecord } from '@/types/User';
import Link from 'next/link';

function NonPremiumUserCard(question: Omit<Question, 'answers'>) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center w-full bg-black p-2 rounded-lg justify-between">
            {question.question}
            {question.dailyQuestion && <p>Daily Question</p>}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          Upgrade your account to view this question
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default function QuestionListCard(opts: {
  question: Omit<Question, 'answers'>;
  user: UserRecord;
}) {
  const { question, user } = opts;

  if (user.userLevel === 'FREE' && !question?.dailyQuestion) {
    return <NonPremiumUserCard {...question} />;
  }

  return (
    <Link
      className="flex items-center w-full bg-black p-2 rounded-lg justify-between"
      href={`/question/${question.uid}`}
    >
      {question.question}
      {question.dailyQuestion && <p>Daily Question</p>}
    </Link>
  );
}
