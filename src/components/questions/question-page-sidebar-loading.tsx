import { Skeleton } from '@/components/ui/skeleton';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';

export default function QuestionPageSidebarLoading() {
  return (
    <aside className="w-full lg:w-[45%] relative">
      <div className="sticky top-10 space-y-10 w-1/2">
        <div className="w-fit h-fit flex flex-col gap-y-2.5">
          <h6 className="text-xl">Your current streak</h6>
          <Skeleton className="h-80 w-64" />
        </div>
        <div className="space-y-4 min-w-fit">
          <div className="flex items-center gap-x-2">
            <h6 className="text-xl">Suggested questions</h6>
            <QuestionMarkCircledIcon className="size-3.5 mt-1 text-gray-300" />
          </div>
          <Skeleton className="h-56 w-full" />
        </div>
      </div>
    </aside>
  );
}
