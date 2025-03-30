import { getQuestions } from '@/actions/questions/admin/list';
import { getStudyPath } from '@/utils/data/study-paths/get';
import StudyPathsList from '../study-paths/list';

export default async function NextRoadmapGraphic({
  studyPathSlug,
  studyPathClassName,
}: {
  studyPathSlug: string;
  studyPathClassName?: string;
}) {
  const studyPath = await getStudyPath(studyPathSlug);

  // get the first 3 questions
  const firstThreeQuestions = studyPath?.questionSlugs.slice(0, 3) ?? [];

  const questions = await getQuestions({
    questionSlugs: firstThreeQuestions,
  });

  return (
    <div className="overflow-hidden relative flex justify-center w-full">
      {studyPath && (
        <StudyPathsList
          offsetType="sine"
          offsetMultiplier={0.12}
          questions={questions}
          studyPath={studyPath}
          className="flex flex-col w-full"
        />
      )}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#000] to-transparent z-10" />
    </div>
  );
}
