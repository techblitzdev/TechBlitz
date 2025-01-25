import { getQuestions } from '@/actions/questions/admin/list';
import QuestionsList from '@/components/app/questions/layout/questions-list';
import StudyPathsList from '@/components/app/study-paths/list';
import Hero from '@/components/global/hero';
import { Button } from '@/components/ui/button';
import { studyPaths } from '@/utils/constants/study-paths';
import { ArrowRightIcon } from 'lucide-react';

const getStartedCta = () => {
  return (
    <Button href="/questions" variant="secondary" className="z-30">
      Get started
      <ArrowRightIcon className="w-4 h-4" />
    </Button>
  );
};

export default async function StudyPathPage({
  params,
}: {
  params: { slug: string };
}) {
  const studyPath = studyPaths.find((path) => path.slug === params.slug);

  // get all of the question data for the questions in the study path
  const questions = getQuestions({
    questionUids: studyPath?.questionUids ?? [],
  });

  console.log(questions);

  return (
    <>
      <Hero
        heading={studyPath?.title}
        container={true}
        children={getStartedCta()}
      />
      <StudyPathsList questions={questions} />
    </>
  );
}
