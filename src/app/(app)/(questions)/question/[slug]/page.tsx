import { getQuestion } from '@/utils/data/questions/get';
import { Separator } from '@/components/ui/separator';
import NoDailyQuestion from '@/components/global/no-daily-question';
import QuestionDisplay from '@/components/app/questions/single/code-snippet';
import { BarChartIcon as ChartColumn, Check, User } from 'lucide-react';
import { getQuestionStats } from '@/utils/data/questions/get-question-stats';
import { useUserServer } from '@/hooks/use-user-server';
import QuestionCard from '@/components/app/questions/single/question-card';
import { getRandomQuestion } from '@/utils/data/questions/get-random';
import ExpandedCodeModal from '@/components/app/questions/expanded-code-modal';
import RelatedQuestions from '@/components/app/questions/single/related-question-card';
import ResizableLayout from '@/components/ui/resizable-layout';
import { capitalise, createMetadata } from '@/utils';

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

export default async function TodaysQuestionPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const user = await useUserServer();

  const [question, totalSubmissions, nextQuestion] = await Promise.all([
    getQuestion('slug', slug),
    getQuestionStats('slug', slug),
    getRandomQuestion({
      identifier: 'slug',
      currentQuestionSlug: slug,
    }),
  ]);

  if (!question) {
    return <NoDailyQuestion textAlign="center" />;
  }

  const leftContent = (
    <div className="flex flex-col gap-y-4 lg:pl-6 p-3">
      <QuestionCard
        question={question}
        user={user}
        nextQuestion={nextQuestion}
        identifier="slug"
      />
    </div>
  );

  const rightContent = (
    <div className="flex flex-col gap-4 lg:pr-6 p-3">
      <div
        id="code-snippet"
        className="h-fit lg:h-[45rem] bg-black-75 border border-black-50 rounded-xl relative overflow-hidden"
      >
        <div className="p-4 text-sm flex w-full items-center justify-between bg-black-25">
          <p className="font-onest">index.js</p>{' '}
          {question.codeSnippet && (
            <ExpandedCodeModal code={question.codeSnippet} />
          )}
        </div>
        <Separator className="bg-black-50" />
        {question?.codeSnippet && (
          <QuestionDisplay
            content={question.codeSnippet}
            backgroundColor="#111111"
          />
        )}
      </div>

      {!question.customQuestion && (
        <div className="min-h-fit bg-black-75 border border-black-50 rounded-xl overflow-hidden">
          <RelatedQuestions slug={slug} tags={question.tags || []} />
        </div>
      )}

      {!question.customQuestion && (
        <div className="bg-black-75 border border-black-50 rounded-xl overflow-hidden min-h-fit">
          <div className="flex items-center gap-x-1 p-4 bg-black-25">
            <ChartColumn className="size-4" />
            <div className="text-sm">Stats</div>
          </div>
          <Separator className="bg-black-50" />
          <div className="p-4 flex items-center">
            <div className="flex items-start gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  <User className="size-4" />
                  <p>Total submissions:</p>
                </div>
                <p>{totalSubmissions?.totalSubmissions}</p>
              </div>
              {totalSubmissions?.percentageCorrect > 0 && (
                <>
                  |
                  <div className="flex items-center gap-0.5">
                    <Check className="size-4" />
                    <p>Success rate:</p>
                    <p>{totalSubmissions?.percentageCorrect}%</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <ResizableLayout
      leftContent={leftContent}
      rightContent={rightContent}
      initialLeftWidth={50}
    />
  );
}
