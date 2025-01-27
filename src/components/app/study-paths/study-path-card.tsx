import type { StudyPath } from '@prisma/client';
import { CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useUserServer } from '@/hooks/use-user-server';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export async function StudyPathCard({ studyPath }: { studyPath: StudyPath }) {
  const user = await useUserServer();

  return (
    <Link
      href={`/study-paths/${studyPath.slug}`}
      className={cn(
        'rounded-lg h-fit w-full overflow-hidden transition-all duration-300 hover:border-black border border-black-50',
        user?.studyPathEnrollments?.find(
          (e) => e.studyPathUid === studyPath.uid
        )
          ? 'border-accent'
          : 'border-black-50'
      )}
    >
      <CardHeader className="relative p-0">
        <div className="relative p-4 text-primary-foreground">
          <h3 className="text-xl font-bold mb-2">{studyPath.title}</h3>
          <p className="text-xs text-gray-400 line-clamp-2">
            {studyPath.description}
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-3">
        <div className="flex flex-col gap-y-2 w-full">
          <p className="text-sm text-gray-400 font-onest">
            {/** if 100% then show 100% else show the progress */}
            {Math.round(
              user?.studyPathEnrollments?.find(
                (e) => e.studyPathUid === studyPath.uid
              )?.progress ?? 0
            ) === 100 ? (
              <div className="flex items-center gap-x-2">
                <CheckCircle className="size-4 text-green-500" />
                <span className="text-sm text-gray-400 font-onest">
                  completed
                </span>
              </div>
            ) : (
              `${Math.round(
                user?.studyPathEnrollments?.find(
                  (e) => e.studyPathUid === studyPath.uid
                )?.progress ?? 0
              )}% completed`
            )}
          </p>
          <Progress
            className="border border-black-50 bg-black-50"
            value={
              user?.studyPathEnrollments?.find(
                (e) => e.studyPathUid === studyPath.uid
              )?.progress ?? 0
            }
          />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          variant={
            user?.studyPathEnrollments?.find(
              (e) => e.studyPathUid === studyPath.uid
            )
              ? 'default'
              : 'secondary'
          }
        >
          {user?.studyPathEnrollments?.find(
            (e) => e.studyPathUid === studyPath.uid
          )
            ? 'In progress'
            : 'Start learning'}
        </Button>
      </CardFooter>
    </Link>
  );
}
