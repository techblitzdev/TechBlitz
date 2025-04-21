'use client';

import { Progress } from '@/components/ui/progress';
import { useSearchParams } from 'next/navigation';

export default function SinglePageProgress({ totalLessons }: { totalLessons: number }) {
  const searchParams = useSearchParams();
  const lessonIndex = searchParams.get('lesson');

  // if for some reason the lesson index is not found, do not render the component
  if (!lessonIndex) {
    return null;
  }

  const progressPercentage = (lessonIndex / totalLessons) * 100;

  return (
    <div className="flex-1 flex flex-col gap-1">
      <Progress
        value={progressPercentage}
        className="h-2 bg-black-50 rounded-full w-full"
        indicatorColor={progressPercentage === 100 ? 'bg-green-500' : 'bg-accent'}
      />
    </div>
  );
}
