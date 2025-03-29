import { StudyPath } from '@/types/StudyPath';

export default function HeroHeading({ studyPath }: { studyPath: StudyPath }) {
  return (
    <div className="flex flex-col gap-y-2 w-full">
      <h1 className="relative z-20 text-3xl md:text-5xl text-wrap text-start font-onest max-w-2xl text-gradient from-white to-white/55 py-1">
        {studyPath?.title}
      </h1>
      <p className="text-sm text-muted-foreground max-w-3xl">{studyPath?.description}</p>
    </div>
  );
}
