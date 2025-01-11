import { redirect } from 'next/navigation';
//dynamic imports
import dynamic from 'next/dynamic';

const RoadmapQuestionCard = dynamic(
  () => import('@/components/app/roadmaps/questions/question-card'),
  {
    ssr: false,
  }
);

// actions
import { fetchRoadmapQuestion } from '@/utils/data/roadmap/questions/fetch-roadmap-question';

// components
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import QuestionDisplay from '@/components/app/questions/single/layout/code-snippet';
import ExpandedCodeModal from '@/components/app/questions/single/layout/expanded-code-modal';

import { useUserServer } from '@/hooks/use-user-server';
// types
import { RoadmapUserQuestions } from '@/types/Roadmap';
import { UserRecord } from '@/types/User';

export default async function RoadmapQuestionPage({
  params,
}: Readonly<{ params: { roadmapUid: string; uid: string } }>) {
  const { roadmapUid, uid } = params;

  // run user and get question in parallel as they do not depend on each other
  const [user, question] = (await Promise.all([
    useUserServer(),
    fetchRoadmapQuestion(uid),
  ])) as [UserRecord, RoadmapUserQuestions];

  // free users do not have access to the roadmap (we also check if the user owns the roadmap in the fetchRoadmapQuestion action)
  if (!user || user.userLevel === 'FREE') {
    return redirect('/dashboard');
  }

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
