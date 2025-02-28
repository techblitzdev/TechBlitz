import { getQuestions } from '@/actions/questions/admin/list';
import { getStudyPath } from '@/utils/data/study-paths/get';
import StudyPathsList from '../study-paths/list';

export default async function NextRoadmapGraphic({ studyPathSlug }: { studyPathSlug: string }) {
  const studyPath = await getStudyPath(studyPathSlug);

  // get the first 3 questions
  const firstThreeQuestions = studyPath?.questionSlugs.slice(0, 3) ?? [];

  const questions = getQuestions({
    questionSlugs: firstThreeQuestions,
  });

  return (
    <div className="overflow-hidden relative flex justify-center">
      {studyPath && (
        <StudyPathsList
          calculateOffset={(index) => Math.sin(index * 2) * 3}
          top={50}
          questions={questions}
          studyPath={studyPath}
        />
      )}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-[#000] to-transparent z-10" />
    </div>
  );
}
