import { fetchRoadmapQuestion } from '@/actions/roadmap/questions/fetch-roadmap-question';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useUserServer } from '@/hooks/use-user-server';
import { redirect } from 'next/navigation';
import QuestionDisplay from '@/components/app/questions/single/code-snippet';
import { RoadmapUserQuestions } from '@/types/Roadmap';
import RoadmapQuestionCard from '@/components/app/roadmaps/questions/question-card';
import ExpandedCodeModal from '@/components/app/questions/expanded-code-modal';

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
    <div className="flex flex-col lg:flex-row gap-8 mt-5">
      <div className="flex flex-col gap-y-4 w-full lg:w-1/2 relative overflow-hidden h-fit ">
        {/* Question Card */}
        <Button className="border border-black-50">
          Question {question.order}
        </Button>
        <RoadmapQuestionCard
          question={question}
          user={user}
          roadmapUid={roadmapUid}
        />
      </div>
      <div className="w-full lg:w-1/2 h-3/4 grid-cols-subgrid gap-8 flex flex-col">
        {/* Code Snippet */}
        <div
          id="code-snippet"
          className="h-[45rem] col-span-full bg-black-75 border border-black-50 rounded-xl relative overflow-hidden"
        >
          <div className="p-4 text-sm flex w-full items-center justify-between bg-black-25">
            <p className="font-onest">index.js</p>{' '}
            {question.codeSnippet && (
              <ExpandedCodeModal code={question.codeSnippet} />
            )}
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
