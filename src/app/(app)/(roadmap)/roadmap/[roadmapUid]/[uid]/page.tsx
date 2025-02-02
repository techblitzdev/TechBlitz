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
import { Separator } from '@/components/ui/separator';
import ExpandedCodeModal from '@/components/app/questions/single/layout/expanded-code-modal';

import { useUserServer } from '@/hooks/use-user-server';
// types
import { RoadmapUserQuestions } from '@/types/Roadmap';
import { UserRecord } from '@/types/User';
import ResizableLayout from '@/components/ui/resizable-layout';
import AiQuestionHelp from '@/components/app/questions/single/layout/ai-question-help';
import ChangeCodeTheme from '@/components/app/questions/single/layout/change-code-theme';

import QuestionCodeDisplayWrapper from '@/components/app/roadmaps/questions/[uid]/layout/question-code-display-wrapper';

export default async function RoadmapQuestionPage({
  params,
}: Readonly<{ params: { roadmapUid: string; uid: string } }>) {
  const { roadmapUid, uid } = params;

  // run user and get question in parallel as they do not depend on each other
  const [user, question] = (await Promise.all([
    useUserServer(),
    fetchRoadmapQuestion(uid),
  ])) as unknown as [UserRecord, RoadmapUserQuestions];

  // free users do not have access to the roadmap (we also check if the user owns the roadmap in the fetchRoadmapQuestion action)
  if (!user || user.userLevel === 'FREE') {
    return redirect('/dashboard');
  }

  if (!question) {
    return redirect(`/roadmap/${roadmapUid}?error_question_not_found`);
  }

  const leftContent = (
    <div className="flex flex-col gap-y-4 p-3 lg:pr-1.5 h-full">
      <RoadmapQuestionCard question={question} user={user} roadmapUid={roadmapUid} />
    </div>
  );

  const rightTopContent = (
    <div className="hidden lg:flex flex-col gap-4 p-3 lg:pl-1.5 h-full">
      <div
        id="code-snippet"
        className="bg-black-75 border border-black-50 rounded-xl relative overflow-scroll h-full"
      >
        <div className="px-4 py-[18px] text-sm flex w-full items-center justify-end bg-black-25 gap-x-3">
          {/** explain question ai button */}
          <AiQuestionHelp question={question} user={user} questionType="roadmap" />
          {/** code theme selector */}
          <ChangeCodeTheme user={user} />
          {/** code snippet */}
          {question.codeSnippet && <ExpandedCodeModal code={question.codeSnippet} />}
        </div>
        <Separator className="bg-black-50" />
        <QuestionCodeDisplayWrapper />
      </div>
    </div>
  );

  return (
    <ResizableLayout
      leftContent={leftContent}
      rightTopContent={rightTopContent}
      initialLeftWidth={50}
      rightBottomContent={null}
    />
  );
}
