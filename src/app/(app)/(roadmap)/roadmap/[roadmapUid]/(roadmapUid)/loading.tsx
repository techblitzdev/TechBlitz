import { Skeleton } from '@/components/ui/skeleton';
import Hero from '@/components/global/hero';

export default function Loading() {
  return (
    <>
      <div className="px-8">
        <Hero
          heading={<Skeleton className="h-8 w-3/4 max-w-2xl" />}
          subheading={<Skeleton className="h-4 w-full max-w-3xl mt-2" />}
        >
          <div className="mt-5 w-fit flex gap-3 z-10">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-32" />
          </div>
        </Hero>
      </div>
      <div className="flex flex-col lg:flex-row gap-10 mt-5 container">
        <div className="order-last md:order-first w-full lg:w-1/2 relative">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex flex-col justify-center mb-8">
              <Skeleton className="h-64 w-full rounded-lg" />
            </div>
          ))}
        </div>

        <aside className="w-full lg:w-1/2 relative">
          <div className="order-first md:order-last sticky top-10 space-y-5 w-full md:w-3/4 xl:w-2/5">
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="flex gap-2 mt-4">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        </aside>
      </div>
    </>
  );
}
