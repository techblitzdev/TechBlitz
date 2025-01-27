import { redirect } from 'next/navigation';

// actions
import { fetchRoadmapQuestion } from '@/utils/data/roadmap/questions/fetch-roadmap-question';

// components
import { Separator } from '@/components/ui/separator';
import SidebarLayoutTrigger from '@/components/global/navigation/sidebar-layout-trigger';
import CurrentStreak from '@/components/ui/current-streak';
import FeedbackButton from '@/components/ui/feedback-button';
import RoadmapQuestionActionButtons from '@/components/app/roadmaps/questions/[uid]/layout/roadmap-question-action-buttons';
import { RoadmapQuestionContextProvider } from '@/components/app/roadmaps/questions/[uid]/layout/roadmap-question-context';
import { useUserServer } from '@/hooks/use-user-server';

export default async function RoadmapQuestionLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { roadmapUid: string; uid: string };
}>) {
  const { roadmapUid, uid } = params;

  const user = await useUserServer();
  // TODO: check if the user owns the roadmap (soon these will be public and shareable)
  if (!user || user.userLevel === 'FREE') {
    return redirect('/dashboard');
  }

  // Fetch the current question
  const question = await fetchRoadmapQuestion(uid);
  if (!question) {
    redirect(`/roadmap/${roadmapUid}`);
  }

  return (
    <RoadmapQuestionContextProvider
      roadmapQuestion={question}
      roadmapUid={roadmapUid}
      user={user}
    >
      <div className="grid grid-cols-12 items-center justify-between pb-2 px-3 relative">
        <div className="col-span-2 lg:col-span-4 flex items-center py-2 justify-start">
          <SidebarLayoutTrigger />
        </div>
        <div className="col-span-7 lg:col-span-4 flex items-center justify-center">
          <RoadmapQuestionActionButtons />
        </div>
        <div className="col-span-3 lg:col-span-4 flex items-center gap-x-1 md:gap-x-3 justify-end">
          <CurrentStreak />
          <FeedbackButton reference={question?.uid || undefined} />
        </div>
      </div>
      <Separator className="bg-black-50" />
      {children}
    </RoadmapQuestionContextProvider>
  );
}
