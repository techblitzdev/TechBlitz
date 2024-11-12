import { DatePicker } from '@mantine/dates';
import PreviousQuestionSuggestedCard from '@/components/questions/previous/previous-question-suggested-table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { User, UserRecord } from '@/types/User';
import { getSuggestions } from '@/actions/questions/get-suggestions';

export default function PreviousQuestionPageSidenbar(opts: {
  user: UserRecord | null;
}) {
  const { user } = opts;

  const today = new Date();
  const date = new Date(today).setDate(today.getDate() - 10);

  const [value, setValue] = useState<[Date | null, Date | null]>([
    new Date(date),
    today,
  ]);

  const { data: suggestions, isLoading: suggestionsLoading } = useQuery({
    queryKey: ['suggested-questions', user?.uid],
    queryFn: async () => {
      if (!user?.uid) {
        throw new Error('User not found');
      }
      return getSuggestions({
        userUid: user.uid,
      });
    },
    enabled: !!user?.uid,
  });

  return (
    <aside className="w-1/2 relative">
      <div className="sticky top-10 space-y-10 w-1/2">
        <div className="w-fit h-fit flex flex-col gap-y-1.5">
          <h6 className="text-xl">Your statistics</h6>
          <DatePicker
            className="z-30 text-white border border-black-50 p-2 rounded-md bg-black-100 hover:cursor-default"
            color="white"
            type="range"
            value={value}
            onChange={setValue}
            c="gray"
            inputMode="none"
            onClick={(e) => e.preventDefault()}
          />
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-x-2">
            <h6 className="text-xl">Suggested questions</h6>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <QuestionMarkCircledIcon className="size-3.5 mt-1 text-gray-300" />
                  <TooltipContent>
                    <p>
                      These question have been suggested based on areas where
                      some users have struggled in the past.
                    </p>
                  </TooltipContent>
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
          </div>
          <PreviousQuestionSuggestedCard
            questions={suggestions ?? []}
            isLoading={suggestionsLoading}
          />
        </div>
      </div>
    </aside>
  );
}
