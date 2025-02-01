import { redirect } from 'next/navigation';
import { Suspense } from 'react';

// actions
import { fetchRoadmapQuestion } from '@/utils/data/roadmap/questions/fetch-roadmap-question';
import { fetchNextPrevRoadmapQuestion } from '@/utils/data/roadmap/questions/fetchNextPrevRoadmapQuestion';

// components
import { Separator } from '@/components/ui/separator';
import SidebarLayoutTrigger from '@/components/app/navigation/sidebar-layout-trigger';
import CurrentStreak from '@/components/ui/current-streak';
import FeedbackButton from '@/components/app/shared/feedback/feedback-button';
import RoadmapQuestionActionButtons from '@/components/app/roadmaps/questions/[uid]/layout/roadmap-question-action-buttons';
import { RoadmapQuestionContextProvider } from '@/components/app/roadmaps/questions/[uid]/layout/roadmap-question-context';
import { RoadmapQuestionNavigation } from '@/components/app/navigation/question-navigation';

// hooks
import { useUserServer } from '@/hooks/use-user-server';
import { RoadmapUserQuestions } from '@/types/Roadmap';
import { UserRecord } from '@/types/User';

export default async function RoadmapQuestionLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { roadmapUid: string; uid: string };
}>) {
  const { roadmapUid, uid } = params;

  const [user, question, { nextQuestion, prevQuestion, roadmap }] = (await Promise.all([
    useUserServer(),
    fetchRoadmapQuestion(uid),
    fetchNextPrevRoadmapQuestion({ roadmapUid, questionUid: uid }),
  ])) as unknown as [
    UserRecord,
    RoadmapUserQuestions,
    {
      nextQuestion: RoadmapUserQuestions | null | undefined;
      prevQuestion: RoadmapUserQuestions | null | undefined;
      roadmap: {
        title: string;
        uid: string;
      };
    },
  ];

  if (!user || user.userLevel === 'FREE') {
    redirect('/dashboard');
  }

  if (!question) {
    redirect(`/roadmap/${roadmapUid}`);
  }

  return (
    <RoadmapQuestionContextProvider roadmapQuestion={question} roadmapUid={roadmapUid} user={user}>
      <div className="grid grid-cols-12 items-center justify-between pb-2 px-3 relative">
        <div className="col-span-2 lg:col-span-4 flex items-center py-2 justify-start">
          <SidebarLayoutTrigger />
          <div className="hidden lg:block">
            <Suspense fallback={<div className="h-8 w-32 bg-gray-200 animate-pulse" />}>
              <RoadmapQuestionNavigation
                nextRoadmapQuestion={nextQuestion}
                prevRoadmapQuestion={prevQuestion}
                roadmap={{
                  title: roadmap?.title || '',
                  uid: roadmap?.uid || '',
                }}
              />
            </Suspense>
          </div>
        </div>
        <div className="col-span-7 lg:col-span-4 flex items-center justify-center">
          <RoadmapQuestionActionButtons />
        </div>
        <div className="col-span-3 lg:col-span-4 flex items-center gap-x-1 md:gap-x-3 justify-end">
          <CurrentStreak />
          <FeedbackButton reference={question.uid} />
        </div>
      </div>
      <Separator className="bg-black-50" />
      {children}
    </RoadmapQuestionContextProvider>
  );
}
