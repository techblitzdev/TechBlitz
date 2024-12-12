import { getQuestion } from '@/actions/questions/get';
import { getRandomQuestion } from '@/actions/questions/get-next-question';
import BackToDashboard from '@/components/ui/back-to-dashboard';
import CurrentStreak from '@/components/ui/current-streak';
import QuestionNavigation from '@/components/global/navigation/question-navigation';
import { Separator } from '@/components/ui/separator';
import { useUserServer } from '@/hooks/useUserServer';

export default async function QuestionUidLayout({
  children,
  params
}: Readonly<{ children: React.ReactNode; params: { uid: string } }>) {
  const { uid } = params;

  const question = await getQuestion(uid);
  const user = await useUserServer();
  if (!user) return;

  const nextQuestion = await getRandomQuestion({
    currentQuestionId: uid,
    userUid: user.uid
  });

  return (
    <>
      <div className="flex items-center justify-between px-6">
        <div className="flex items-center gap-x-5 py-2">
          {/** Previous question button */}
          <BackToDashboard />
          {question?.dailyQuestion && question?.questionDate && (
            <div className="font-ubuntu flex gap-x-5 items-center">
              <p>Daily question</p>
            </div>
          )}
        </div>
        <div className="flex items-center gap-x-5">
          <CurrentStreak />
          <QuestionNavigation
            nextQuestion={nextQuestion ? `/question/${nextQuestion}` : null}
            previousQuestion={null}
            navigationType="question"
          />
        </div>
      </div>
      <Separator className="bg-black-50" />
      {children}
    </>
  );
}
