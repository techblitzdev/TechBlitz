import { cn } from '@/lib/utils';
import { ChevronRight, List } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useQuestionSingle } from '@/contexts/question-single-context';
import { use } from 'react';
import QuestionCard from '../questions/layout/question-card';
import Link from 'next/link';
import ChallengeListClient from './challenge-list-client';
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { Tooltip } from '@/components/ui/tooltip';

export default function ChallengeList({ className }: { className?: string }) {
  const { relatedQuestions, user, suggestedQuestions } = useQuestionSingle();
  if (!relatedQuestions) return null;
  if (!suggestedQuestions) return null;

  const relatedQuestionsData = use(relatedQuestions);
  const suggestedQuestionsData = use(suggestedQuestions);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className={cn('flex items-center gap-x-2', className)}>
          <List className="size-4" />
          <p className="text-sm font-medium">Challenge List</p>
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="bg-black-75">
        <div className="flex flex-col h-full gap-10">
          <Link href="/questions" className="flex items-center gap-x-2 group">
            <h6 className="text-xl font-bold">Challenge List</h6>
            <ChevronRight className="size-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <div className="flex-1">
            <ChallengeListClient>
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
            </ChallengeListClient>
          </div>
          {/* Place your bottom element here */}
          <div className="flex flex-col gap-y-3">
            <div className="flex items-center gap-x-2">
              <h6 className="font-medium text-xs">Recommended Challenge</h6>
              <TooltipProvider delayDuration={0} skipDelayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <QuestionMarkCircledIcon className="size-3 text-white" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This is a recommended challenge based on your answer history.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <ChallengeListClient>
              <QuestionCard
                key={suggestedQuestionsData[0].uid}
                questionData={suggestedQuestionsData[0]}
                identifier="slug"
                user={user}
                className="border-none p-0"
                numberOfTags={0}
              />
            </ChallengeListClient>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
