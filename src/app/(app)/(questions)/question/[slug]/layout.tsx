// Components
import BackToDashboard from '@/components/ui/back-to-dashboard';
import CurrentStreak from '@/components/ui/current-streak';
import { Separator } from '@/components/ui/separator';
import FeedbackButton from '@/components/ui/feedback-button';
import SidebarLayoutTrigger from '@/components/global/navigation/sidebar-layout-trigger';
import RandomQuestion from '@/components/global/random-question';
import { createMetadata, getQuestionEducationLevel } from '@/utils/seo';
import { capitalise, getBaseUrl } from '@/utils';

// Actions
import { getQuestion } from '@/utils/data/questions/get';
import { QuizJsonLd } from '@/types/Seo';
import { QuestionSingleContextProvider } from '@/components/app/questions/single/layout/question-single-context';
import { getUser } from '@/actions/user/authed/get-user';
import { redirect } from 'next/navigation';
import QuestionActionButtons from '@/components/app/questions/single/layout/question-action-buttons';
import { getRelatedQuestions } from '@/utils/data/questions/get-related';
import ShareQuestion from '@/components/global/share-question';
import { getUserAnswer } from '@/utils/data/answers/get-user-answer';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const question = await getQuestion('slug', params.slug);
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
    canonicalUrl: `/question/${params.slug}`,
  });
}

export default async function QuestionUidLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { slug: string } }>) {
  const { slug } = params;

  const [user, question] = await Promise.all([
    getUser(),
    getQuestion('slug', slug),
  ]);

  if (!question || !question.slug || !question.tags) {
    return redirect('/questions');
  }

  // create a promise to get the related questions
  const relatedQuestions = getRelatedQuestions({
    questionSlug: question.slug,
    tags: question.tags,
    limit: 3,
  });

  const userAnswered = getUserAnswer({ questionUid: question.uid });

  // create json ld
  const jsonLd: QuizJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    // replace the - with a space and
    name: capitalise(question?.slug?.replace(/-/g, ' ') || ''),
    description: question?.question || '',
    url: `${getBaseUrl()}/question/${slug}`,
    educationLevel: getQuestionEducationLevel(question?.difficulty || 'EASY'),
    educationalUse: 'practice',
    learningResourceType: ['quiz', 'learning activity'],
    creator: {
      '@type': 'Organization',
      name: 'TechBlitz',
      url: getBaseUrl(),
    },
    assesses: ['coding'],
    dateCreated: question?.createdAt.toISOString() || '',
    dateModified: question?.updatedAt.toISOString() || '',
    datePublished:
      question?.questionDate || question?.createdAt.toISOString() || '',
    headline: question?.question || '',
    interactivityType: 'mixed',
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    teaches: 'coding',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <QuestionSingleContextProvider
        question={question}
        user={user}
        relatedQuestions={relatedQuestions}
        userAnswered={userAnswered}
      >
        <div className="grid grid-cols-12 items-center justify-between pb-2 px-3 lg:px-6 relative">
          <div className="col-span-2 lg:col-span-4 flex items-center gap-x-5 py-2 justify-start">
            <SidebarLayoutTrigger />
            <div className="items-center gap-x-2 hidden md:flex">
              <BackToDashboard href="/questions/" />
              <RandomQuestion identifier="slug" currentQuestionSlug={slug} />
            </div>
            {question?.dailyQuestion && question?.questionDate && (
              <div className="font-ubuntu gap-x-5 items-center hidden md:flex">
                <p>Daily question</p>
              </div>
            )}
          </div>
          <div className="col-span-7 lg:col-span-4 flex items-center justify-center">
            <QuestionActionButtons />
          </div>
          <div className="col-span-3 lg:col-span-4 flex items-center gap-x-1 md:gap-x-3 justify-end">
            <CurrentStreak />
            <ShareQuestion />
            <FeedbackButton reference={question?.slug || undefined} />
          </div>
        </div>
        <Separator className="bg-black-50" />
        {children}
      </QuestionSingleContextProvider>
    </>
  );
}
