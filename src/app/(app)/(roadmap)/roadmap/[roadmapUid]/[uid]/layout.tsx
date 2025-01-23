import { redirect } from 'next/navigation';

// actions
import { fetchRoadmapQuestionViaOrder } from '@/utils/data/roadmap/questions/fetch-question-via-order';
import { fetchRoadmapQuestion } from '@/utils/data/roadmap/questions/fetch-roadmap-question';

// components
import BackToDashboard from '@/components/ui/back-to-dashboard';
import QuestionNavigation from '@/components/global/navigation/question-navigation';
import { Separator } from '@/components/ui/separator';
import SidebarLayoutTrigger from '@/components/global/navigation/sidebar-layout-trigger';

export default async function RoadmapQuestionLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { roadmapUid: string; uid: string };
}>) {
  const { roadmapUid, uid } = params;

  // Fetch the current question
  const question = await fetchRoadmapQuestion(uid);
  if (!question) {
    redirect(`/roadmap/${roadmapUid}`);
  }

  // run next and previous questions in parallel as they do not depend on each other
  const [nextQuestion, previousQuestion] = await Promise.all([
    fetchRoadmapQuestionViaOrder({
      order: question.order + 1,
      roadmapUid,
    }),
    fetchRoadmapQuestionViaOrder({
      order: question.order - 1,
      roadmapUid,
    }),
  ]);

  return (
    <>
      <div className="flex items-center justify-between px-6">
        <div className="flex items-center gap-x-5 py-2">
          <SidebarLayoutTrigger />
          <BackToDashboard href={`/roadmap/${roadmapUid}`} backTo="roadmap" />
        </div>
        <QuestionNavigation
          nextQuestion={
            nextQuestion ? `/roadmap/${roadmapUid}/${nextQuestion.uid}` : null
          }
          previousQuestion={
            previousQuestion
              ? `/roadmap/${roadmapUid}/${previousQuestion.uid}`
              : null
          }
          navigationType="question"
        />
      </div>
      <Separator className="bg-black-50 mt-4" />
      <div className="px-6 h-full mt-1">{children}</div>
    </>
  );
}
