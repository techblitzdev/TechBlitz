import { getQuestions } from '@/actions/questions/admin/list';
import StudyPathsList from '@/components/app/study-paths/list';
import { getStudyPath } from '@/utils/data/study-paths/get';

type screenSize = 'lg' | 'md' | 'sm';

export default async function RoadmapShowcaseBlock({
  title,
  subheader,
  align = 'left',
  studyPathFirst = false,
  paddingTop = 'lg:pt-12',
  paddingBottom = 'lg:pb-24',
}: {
  title?: string;
  subheader?: string | React.ReactNode;
  align?: 'left' | 'right' | 'center';
  studyPathFirst?: boolean;
  paddingTop?: `${screenSize}:pt-${number}`;
  paddingBottom?: `${screenSize}:pb-${number}`;
}) {
  const alignMap = {
    left: 'md:col-span-6',
    right: 'md:col-span-6',
    center: 'md:col-span-12',
  };

  const studyPath = await getStudyPath('javascript-fundamentals');
  const questions = await getQuestions({
    questionSlugs: studyPath?.questionSlugs.slice(0, 3) ?? [],
  });

  const TextContent = () => (
    <div className={`col-span-full ${alignMap[align]} flex flex-col gap-3`}>
      <h2 className="text-2xl lg:text-3xl font-bold">{title}</h2>
      {typeof subheader === 'string' ? <p className="text-gray-400">{subheader}</p> : subheader}
    </div>
  );

  const StudyPathContent = () => (
    <div className="col-span-full md:col-span-6 relative overflow-hidden">
      <div className="overflow-hidden relative flex justify-center w-full h-52">
        {studyPath && (
          <StudyPathsList
            offsetType="sine"
            offsetMultiplier={0.12}
            questions={questions}
            studyPath={studyPath}
            className="flex flex-col gap-4"
          />
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#000] to-transparent z-10" />
    </div>
  );

  return (
    <section
      className={`grid grid-cols-1 md:grid-cols-12 gap-8 py-16 md:pt-24 md:pb-32 items-center ${paddingTop} ${paddingBottom}`}
    >
      {studyPathFirst ? (
        <>
          <StudyPathContent />
          <TextContent />
        </>
      ) : (
        <>
          <TextContent />
          <StudyPathContent />
        </>
      )}
    </section>
  );
}
