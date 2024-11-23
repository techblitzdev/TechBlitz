import { fetchRoadmapQuestionViaOrder } from '@/actions/roadmap/questions/fetch-question-via-order';
import { fetchRoadmapQuestion } from '@/actions/roadmap/questions/fetch-roadmap-question';
import BackToDashboard from '@/components/global/back-to-dashboard';
import QuestionNavigation from '@/components/global/navigation/question-navigation';
import { Separator } from '@/components/ui/separator';
import { redirect } from 'next/navigation';

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

  // Fetch the previous and next questions
  const nextQuestion = await fetchRoadmapQuestionViaOrder({
    order: question.order + 1,
    roadmapUid,
  });
  const previousQuestion = await fetchRoadmapQuestionViaOrder({
    order: question.order - 1,
    roadmapUid,
  });

  return (
    <>
      <div className="flex items-center justify-between px-6">
        <div className="flex items-center gap-x-5 py-2">
          <BackToDashboard href={`/roadmap/${roadmapUid}`} />
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
        />
      </div>
      <Separator className="bg-black-50 mt-4" />
      <div className="px-6 h-full mt-1">{children}</div>
    </>
  );
}
