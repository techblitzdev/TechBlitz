import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Expand } from 'lucide-react';

export default function RoadmapQuestionPageLoading() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 mt-5">
      <div className="flex flex-col gap-y-4 w-full lg:w-1/2 relative overflow-hidden h-fit ">
        {/* Question Card */}
        <Button className="border border-black-50" disabled>
          <Skeleton className="h-4 w-24" />
        </Button>
        <div className="col-span-full lg:col-span-6 h-fit bg-black-75 border border-black-50 rounded-xl overflow-hidden">
          <div className="p-4 w-full flex justify-between bg-black-25 items-center">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Separator className="bg-black-50" />
          <div className="h-fit bg-black-100 p-4">
            {/** question */}
            <Skeleton className="h-6 w-3/4 mb-4" />
            {/** answers */}
            <div className="flex flex-col gap-4 pt-4">
              <Skeleton className="h-20 w-full mb-2" />
              <Skeleton className="h-20 w-5/6 mb-2" />
              <Skeleton className="h-20 w-full mb-2" />
              <Skeleton className="h-20 w-3/4" />
            </div>
          </div>
          <Separator className="bg-black-50" />
          <div className="p-4 w-full flex justify-end items-center bg-black-25">
            <div className="flex items-center gap-4 self-end">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-20" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 h-3/4 grid-cols-subgrid gap-8 flex flex-col">
        {/* Code Snippet */}
        <div
          id="code-snippet"
          className="h-[45rem] col-span-full bg-black-75 border border-black-50 rounded-xl relative overflow-hidden"
        >
          <div className="p-4 text-sm flex w-full items-center justify-between bg-black-25">
            <Skeleton className="h-4 w-16" />
            <Expand className="size-6" />
          </div>
          <Separator className="bg-black-50" />
          <div className="p-4">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </div>
    </div>
  );
}
