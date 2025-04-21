import { useSearchParams } from 'next/navigation';

export default function RoadmapLessonLayoutClient({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const lessonIndex = searchParams.get('lesson');

  return <>{children}</>;
}
