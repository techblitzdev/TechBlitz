// Components
import CurrentStreak from '@/components/ui/current-streak';
import { Separator } from '@/components/ui/separator';
import { createMetadata } from '@/utils/seo';
import { capitalise } from '@/utils';

// Actions
import { getQuestion } from '@/utils/data/questions/get';
import { QuestionSingleContextProvider } from '@/contexts/question-single-context';
import { getUser } from '@/actions/user/authed/get-user';
import { redirect } from 'next/navigation';
import QuestionActionButtons from '@/components/app/questions/single/layout/question-action-buttons';
import { getUserAnswer } from '@/utils/data/answers/get-user-answer';
import QuestionNavigation from '@/components/app/navigation/question-navigation';
import { getNextAndPreviousQuestion } from '@/utils/data/questions/question-navigation';
import RandomQuestion from '@/components/shared/random-question';
import { getSuggestions } from '@/utils/data/questions/get-suggestions';
import UserXp from '@/components/ui/user-xp';

// Define navigation interface to match the data from getNextAndPreviousQuestion
interface NavigationData {
  nextQuestion: string | null | undefined;
  previousQuestion: string | null | undefined;
}

export async function generateMetadata({ params }: { params: { uid: string } }) {
  const question = await getQuestion('uid', params.uid);
  // get the title via slug and removing the - from the slug
  const title = question?.slug?.replace(/-/g, ' ') || 'Coding Question';

  return createMetadata({
    title: `${capitalise(title)} | TechBlitz`,
    description: 'Boost your coding skills for free with TechBlitz',
    image: {
      text: `${title} | TechBlitz`,
      bgColor: '#000000',
      textColor: '#ffffff',
    },
    canonicalUrl: `/question/custom/${params.uid}`,
  });
}

export default async function QuestionUidLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { uid: string } }>) {
  const { uid } = params;

  const question = await getQuestion('uid', uid);
  if (!question) {
    return redirect('/questions/custom');
  }
  const user = await getUser();

  const userAnswered = getUserAnswer({ questionUid: question.uid });
  const suggestedQuestions = getSuggestions({ limit: 2 });
  const nextAndPreviousQuestion = getNextAndPreviousQuestion(uid);

  return (
    <>
      <QuestionSingleContextProvider
        question={question}
        user={user}
        relatedQuestions={null}
        userAnswered={userAnswered}
        suggestedQuestions={suggestedQuestions}
      >
        <div className="grid grid-cols-12 items-center justify-between pb-2 px-3 lg:px-6 relative">
          <div className="col-span-2 lg:col-span-4 flex items-center py-2 justify-start">
            <div className="items-center gap-x-2 hidden md:flex">
              <QuestionNavigation
                navigationType="question"
                nextPrevPromise={nextAndPreviousQuestion}
                slug={uid}
              />
              <RandomQuestion identifier="uid" currentQuestionSlug={uid} />
            </div>
          </div>
          <div className="col-span-7 lg:col-span-4 flex items-center justify-center">
            <QuestionActionButtons />
          </div>
          <div className="col-span-3 lg:col-span-4 flex items-center gap-x-1 md:gap-x-3 justify-end">
            <CurrentStreak />
            <UserXp />
          </div>
        </div>
        <Separator className="bg-black-50" />
        {children}
      </QuestionSingleContextProvider>
    </>
  );
}
