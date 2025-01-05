import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { TabsList, Tabs, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, FileText } from 'lucide-react';

export default function Loading() {
  const leftContent = (
    <div className="flex flex-col gap-y-4 lg:pl-6 p-3">
      <div className="bg-black border border-black-50 rounded-xl overflow-hidden">
        {/** Question Card Header */}
        <div className="p-4 bg-black-25 flex justify-between">
          {/** Question Card Difficulty */}
          <Skeleton className="h-5 w-20" />
          {/** Question Card Time Taken */}
          <Skeleton className="h-5 w-16" />
        </div>
        <div className="h-fit bg-black">
          <Tabs defaultValue="description">
            <TabsList className="h-auto grid w-full grid-cols-2 text-white rounded-none bg-transparent p-4">
              <TabsTrigger value="description">
                <FileText className="mr-2 size-4" />
                Description
              </TabsTrigger>
              <TabsTrigger value="resources">
                <BookOpen className="mr-2 size-4" />
                Resources
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <Separator className="bg-black-50" />

        {/** Question Card title */}
        <div className="p-6">
          {/** Question is daily question */}
          <Skeleton className="h-4 w-1/3 mb-4" />
          {/** Question Title */}
          <Skeleton className="h-24 w-full mb-4" />

          <div className="flex flex-col gap-y-4">
            {/** question answer form */}
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
        <Separator className="bg-black-50" />
        {/** Question Card Footer */}
        <div className="flex items-center justify-between px-6 py-4">
          {/** Question Card Tags */}
          <Skeleton className="h-5 w-20" />
          {/** Question Card Feedback Button */}
          <Skeleton className="h-5 w-20" />
        </div>
      </div>
    </div>
  );

  const rightContent = (
    <div className="flex flex-col gap-4 lg:pr-6 p-3">
      <div className="h-[45rem] bg-black-75 border border-black-50 rounded-xl overflow-hidden">
        <div className="p-4 bg-black-25">
          <Skeleton className="h-5 w-20" />
        </div>
        <Separator className="bg-black-50" />
        <div className="p-4">
          <Skeleton className="h-full w-full" />
        </div>
      </div>

      <div className="h-48 bg-black-75 border border-black-50 rounded-xl overflow-hidden">
        <div className="p-4 bg-black-25">
          <Skeleton className="h-5 w-32" />
        </div>
        <Separator className="bg-black-50" />
        <div className="p-4">
          <Skeleton className="h-24 w-full" />
        </div>
      </div>

      <div className="h-32 bg-black-75 border border-black-50 rounded-xl overflow-hidden">
        <div className="p-4 bg-black-25">
          <Skeleton className="h-5 w-16" />
        </div>
        <Separator className="bg-black-50" />
        <div className="p-4">
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-2">
      {leftContent}
      {rightContent}
    </div>
  );
}
