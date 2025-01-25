import { StudyPath } from '@/utils/constants/study-paths';

export default function StudyPathSidebar(opts: { studyPath: StudyPath }) {
  const { studyPath } = opts;

  return (
    <aside className="w-full xl:w-1/4">
      <div className="sticky top-10 space-y-10 w-full">
        <div className="w-fit h-fit flex flex-col gap-y-2.5">
          <h6 className="text-xl underline">Summary</h6>
          <p className="text-sm text-gray-400">{studyPath.description}</p>
        </div>
      </div>
    </aside>
  );
}
