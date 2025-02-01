import { Skeleton } from '@/components/ui/skeleton';
import { CarouselItem, CarouselContent, Carousel } from '@/components/ui/carousel';

export default function QuestionCarouselLoading() {
  return (
    <Carousel className="relative w-full">
      <div className="hidden md:block absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-[#000000] to-transparent z-10" />
      <CarouselContent className="flex flex-col gap-4">
        <CarouselItem className="flex">
          <div className="flex flex-col justify-between space-y-5 items-start border border-black-50 p-6 rounded-lg w-full h-full relative overflow-hidden">
            <Skeleton className="h-6 w-full" />
            <div className="flex items-center gap-x-2 w-full">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 w-24" />
            </div>
            <div className="flex w-full justify-between items-center">
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
