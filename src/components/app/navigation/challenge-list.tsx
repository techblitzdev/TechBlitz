import { cn } from '@/lib/utils';
import { List } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useQuestionSingle } from '@/contexts/question-single-context';
import { use } from 'react';
import QuestionCard from '../questions/layout/question-card';

export default function ChallengeList({ className }: { className?: string }) {
  const { relatedQuestions, user } = useQuestionSingle();
  if (!relatedQuestions) return null;

  const relatedQuestionsData = use(relatedQuestions);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className={cn('flex items-center gap-x-2', className)}>
          <List className="size-4" />
          <p className="text-sm font-medium">Challenge List</p>
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="bg-black-75">
        <div className="flex flex-col h-full gap-5">
          <h6 className="text-xl font-bold">Challenge List</h6>
          <div className="flex-1 space-y-4">
            {relatedQuestionsData?.map((question) => (
              <QuestionCard
                key={question.uid}
                questionData={question}
                identifier="slug"
                user={user}
                className="border-none p-0"
                numberOfTags={0}
              />
            ))}
          </div>
          {/* Place your bottom element here */}
          <div className="flex flex-col gap-y-2">
            <h6 className="font-medium text-xs">Recommended Challenge</h6>
            <p className="text-xl font-medium">Challenge 1</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
