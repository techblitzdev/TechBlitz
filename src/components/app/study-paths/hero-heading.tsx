import type { StudyPath } from '@prisma/client';

export default function HeroHeading({ studyPath }: { studyPath: StudyPath }) {
  return (
    <div className="flex w-full justify-between item-center">
      <h1 className="relative z-20 text-3xl md:text-5xl text-wrap text-start font-inter max-w-2xl text-gradient from-white to-white/55 py-1">
        {studyPath?.title}
      </h1>
    </div>
  );
}
