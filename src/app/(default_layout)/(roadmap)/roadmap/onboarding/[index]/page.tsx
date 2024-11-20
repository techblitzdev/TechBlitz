import QuestionCard from '@/components/questions/single/question-card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useUserServer } from '@/hooks/useUserServer';
import { Expand } from 'lucide-react';
import QuestionDisplay from '@/components/questions/single/code-snippet';
import { fetchRoadmapQuestionViaOrder } from '@/actions/roadmap/questions/fetch-roadmap-question-via-order';
import { createOrFetchUserRoadmap } from '@/actions/roadmap/create-or-fetch-user-roadmap';

export default async function RoadmapQuestionPage({
  params,
}: {
  params: { index: number };
}) {
  const { index } = params;

  // ensure the user is logged in
  const user = await useUserServer();
  if (!user) {
    return;
  }

  // create a new roadmap question
  await createOrFetchUserRoadmap({
    userUid: user.uid,
  });

  // get the question
  const question = await fetchRoadmapQuestionViaOrder(index);
  if (!question) {
    return 'No question found';
  }

  return (
    <>
      <div className="flex gap-8 mt-5">
        {/* Left Section - Question and Stats */}
        <div className="flex flex-col gap-y-4 w-1/2 relative overflow-hidden h-fit">
          {/* Question Card */}
          <Button className="border border-black-50">Question</Button>
          <QuestionCard
            question={question}
            user={user}
            isRoadmapQuestion={true}
          />
        </div>

        {/* Right Section - Code Snippet and Related Questions */}
        <div className="w-1/2 h-3/4 grid-cols-subgrid gap-8 flex flex-col">
          {/* Code Snippet */}
          <div className="h-[45rem] col-span-full bg-black-75 border border-black-50 rounded-xl relative overflow-hidden">
            <div className="p-4 text-sm flex w-full items-center justify-between bg-black-25">
              <p>Code</p>
              <div className="flex items-center gap-x-3">
                <Expand className="size-4 text-gray-500" />
              </div>
            </div>
            <Separator className="bg-black-50" />
            {question?.codeSnippet && (
              <QuestionDisplay content={question.codeSnippet} language="" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
