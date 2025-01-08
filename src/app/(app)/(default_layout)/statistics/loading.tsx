import Hero from '@/components/global/hero';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <>
      <div className="flex flex-col gap-3 md:flex-row w-full justify-between md:items-center">
        <Hero
          heading="Statistics"
          container={false}
          subheading="An overview of your coding journey on techblitz."
        />
        <div className="flex gap-3">
          <Skeleton className="h-10 w-32 rounded-md" />
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-y-4 gap-x-8 mt-8 md:mt-0">
        <div className="max-h-[28rem] col-span-12 mb-4">
          <Skeleton className="h-[28rem] w-full rounded-md" />
        </div>
        <Skeleton className="min-h-96 col-span-12 lg:col-span-6 rounded-md" />
        <Skeleton className="min-h-96 col-span-12 lg:col-span-6 rounded-md" />
      </div>
    </>
  );
}
