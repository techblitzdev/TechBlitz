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

  const question = await getQuestion('slug', slug);

  // determine the education level based on the question

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
    dateCreated: new Date(question?.createdAt || '').toISOString(),
    dateModified: new Date(question?.updatedAt || '').toISOString(),
    datePublished: new Date(
      question?.questionDate || question?.createdAt || ''
    ).toISOString(),
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
      <div className="flex items-center justify-between py-2 px-6">
        <div className="flex items-center gap-x-5 py-2">
          <SidebarLayoutTrigger />
          {/** Previous question button */}
          <BackToDashboard href="/questions/" />
          {question?.dailyQuestion && question?.questionDate && (
            <div className="font-ubuntu flex gap-x-5 items-center">
              <p>Daily question</p>
            </div>
          )}
        </div>
        <div className="flex items-center gap-x-3">
          <CurrentStreak />
          <RandomQuestion identifier="slug" currentQuestionSlug={slug} />
          <FeedbackButton reference={question?.slug || undefined} />
        </div>
      </div>
      <Separator className="bg-black-50" />
      {children}
    </>
  );
}
