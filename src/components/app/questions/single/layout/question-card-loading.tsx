import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookIcon, FileText, PieChart } from 'lucide-react';

export default function QuestionCardLoading() {
  return (
    <Tabs
      defaultValue="description"
      className="h-full bg-black-75 border border-black-50 rounded-lg flex flex-col overflow-hidden"
    >
      <div className="p-4 lg:px-3 lg:py-0 w-full flex flex-col gap-3 md:flex-row justify-between bg-black-25 md:items-center">
        <div className="flex items-center gap-2 justify-between w-full">
          <TabsList className="hidden lg:grid h-auto w-fit grid-cols-3 gap-5 text-white rounded-lg bg-transparent p-1">
            <TabsTrigger
              value="description"
              className="flex items-center justify-center text-sm font-medium transition-colors rounded-md text-gray-400 data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:underline border-0 w-fit px-0"
            >
              <FileText className="size-4 mr-2" />
              Description
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              className="flex items-center justify-center text-sm font-medium transition-colors rounded-md text-gray-400 data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:underline border-0 w-fit px-0"
            >
              <BookIcon className="size-4 mr-2" />
              Resources
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className="flex items-center justify-center text-sm font-medium transition-colors rounded-md text-gray-400 data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:underline border-0 w-fit px-0"
            >
              <PieChart className="size-4 mr-2" />
              Stats
            </TabsTrigger>
          </TabsList>
        </div>
      </div>
      <Separator className="bg-black-50" />
      <div className="flex-1 bg-black overflow-y-auto scrollable-element relative p-4">
        <div className="w-full flex items-center justify-between mb-6">
          <Skeleton className="h-8 w-3/4" /> {/* Question title */}
          <div className="flex items-center gap-2">
            <Skeleton className="size-4" /> {/*  */}
            <Skeleton className="size-4" /> {/*  */}
            <Skeleton className="size-4" /> {/*  */}
          </div>
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-4" />
        <Skeleton className="h-32 w-full mb-4" /> {/* Code snippet or answer area */}
      </div>
      <Separator className="bg-black-50" />
      <div className="w-full space-y-4 bg-black p-4">
        <Skeleton className="h-10 w-full" /> {/* Hint accordion */}
      </div>
      <Separator className="bg-black-50" />
      <div className="p-4 flex justify-between items-center">
        <Skeleton className="h-8 w-32" /> {/* Tags */}
        <Skeleton className="h-10 w-24" /> {/* Submit button */}
      </div>
    </Tabs>
  );
}
