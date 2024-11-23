import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useUserServer } from '@/hooks/useUserServer';
import { Expand } from 'lucide-react';
import QuestionDisplay from '@/components/questions/single/code-snippet';
import { fetchRoadmapQuestionViaOrder } from '@/actions/roadmap/questions/default/fetch-roadmap-question-via-order';
import OnboardingQuestionCard from '@/components/roadmaps/onboarding/onboarding-question-card';
import { redirect } from 'next/navigation';
import { checkIfUserIsOnCorrectQuestionIndex } from '@/actions/roadmap/questions/check-user-is-on-correct-index';
import LoadingSpinner from '@/components/ui/loading';
import { DefaultRoadmapQuestions } from '@prisma/client';

export default async function RoadmapQuestionPage({
  params,
}: {
  params: { roadmapUid: string; index: number };
}) {
  const { index, roadmapUid } = params;

  // ensure the user is logged in
  const user = await useUserServer();
  if (!user) {
    return;
  }

  // check if the current index is the current question index
  // on the roadmap
  const isCorrectQuestion = await checkIfUserIsOnCorrectQuestionIndex({
    currentQuestionIndex: index,
    roadmapUid,
    userUid: user.uid,
  });

  if (isCorrectQuestion !== true) {
    return redirect(`/roadmap/${roadmapUid}/onboarding/${isCorrectQuestion}`);
  }

  // get the question
  const question = await fetchRoadmapQuestionViaOrder(index);
  // if there is no question, redirect to a 'holding' page to generate
  // the questions for the user
  if (!question) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="flex gap-8 mt-5 px-6">
        {/* Left Section - Question and Stats */}
        <div className="flex flex-col gap-y-4 w-1/2 relative overflow-hidden h-fit">
          {/* Question Card */}
          <Button className="border border-black-50">Question</Button>
          <OnboardingQuestionCard
            question={question}
            user={user}
            roadmapUid={roadmapUid}
            isDefaultQuestion={true}
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
