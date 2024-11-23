import { fetchRoadmapQuestion } from '@/actions/roadmap/questions/fetch-roadmap-question';
import OnboardingQuestionCard from '@/components/roadmaps/onboarding/onboarding-question-card';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useUserServer } from '@/hooks/useUserServer';
import { Expand } from 'lucide-react';
import { redirect } from 'next/navigation';
import QuestionDisplay from '@/components/questions/single/code-snippet';
import { RoadmapUserQuestions } from '@/types/Roadmap';

export default async function RoadmapQuestionPage({
  params,
}: Readonly<{ params: { roadmapUid: string; uid: string } }>) {
  const { roadmapUid, uid } = params;

  const user = await useUserServer();
  if (!user) {
    return;
  }

  // grab the question from the db
  const question = (await fetchRoadmapQuestion(uid)) as RoadmapUserQuestions;
  if (!question) {
    return redirect(`/roadmap/${roadmapUid}?error_question_not_found`);
  }

  return (
    <div className="flex gap-8 mt-5">
      <div className="flex flex-col gap-y-4 w-1/2 relative overflow-hidden h-fit ">
        {/* Question Card */}
        <Button className="border border-black-50">
          Question {question.order}
        </Button>
        <OnboardingQuestionCard
          question={question}
          user={user}
          roadmapUid={roadmapUid}
        />
      </div>
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
  );
}
