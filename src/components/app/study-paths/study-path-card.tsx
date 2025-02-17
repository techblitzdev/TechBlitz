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
      href={studyPath.isPublished ? `/roadmaps/${studyPath.slug}` : ''}
      className={cn(
        'rounded-lg h-fit w-full overflow-hidden transition-all duration-300 bg-[#090909] hover:border-black border border-black-50 group',
        !studyPath.isPublished && 'cursor-not-allowed'
      )}
    >
      <CardHeader className="relative p-0">
        <div className="relative p-4 text-primary-foreground group-hover:opacity-80 transition-all duration-300">
          <h3 className="text-xl font-bold mb-2">{studyPath.title}</h3>
          <p className="text-xs text-gray-400 line-clamp-2">{studyPath.description}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-3 relative">
        <div className="flex flex-col gap-y-2 w-full">
          <div className="text-sm text-gray-400 font-onest">
            {/** if 100% then show 100% else show the progress */}
            {Math.round(
              user?.studyPathEnrollments?.find((e) => e.studyPathUid === studyPath.uid)?.progress ??
                0
            ) === 100 ? (
              <div className="flex items-center gap-x-2">
                <CheckCircle className="size-4 text-green-500" />
                <p className="text-sm text-gray-400 font-onest">completed</p>
              </div>
            ) : (
              `${Math.round(
                user?.studyPathEnrollments?.find((e) => e.studyPathUid === studyPath.uid)
                  ?.progress ?? 0
              )}% completed`
            )}
          </div>
          <Progress
            className="border border-black-50 bg-black-50 relative z-10"
            value={
              user?.studyPathEnrollments?.find((e) => e.studyPathUid === studyPath.uid)?.progress ??
              0
            }
          />
        </div>
        <div className="absolute -bottom-28 -right-7 group-hover:-bottom-24 group-hover:-right-5 transition-all duration-300 group-hover:z-30">
          {studyPath.icon && (
            <div
              className="size-[200px] opacity-10 group-hover:opacity-100 transition-all duration-300"
              dangerouslySetInnerHTML={{
                __html: studyPath.icon.replace('<svg', '<svg width="200" height="200"'),
              }}
            />
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {studyPath.isPublished ? (
          <Button
            className="w-full"
            variant={
              user?.studyPathEnrollments?.find((e) => e.studyPathUid === studyPath.uid)
                ? 'default'
                : 'secondary'
            }
          >
            {user?.studyPathEnrollments?.find((e) => e.studyPathUid === studyPath.uid)
              ? 'In progress'
              : 'Start learning'}
          </Button>
        ) : (
          <Button className="w-full" variant="secondary" disabled>
            Coming soon
          </Button>
        )}
      </CardFooter>
    </Link>
  );
}
