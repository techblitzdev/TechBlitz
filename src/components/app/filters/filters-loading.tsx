import { Skeleton } from "@/components/ui/skeleton";

export default function FilterLoading() {
  return (
    <div className="flex flex-col gap-4">
      {/* Top row with filters */}
      <div className="flex flex-col md:flex-row gap-2 w-full justify-between">
        <div className="flex flex-wrap gap-2 items-end">
          {/* Difficulty Button Loading */}
          <Skeleton className="h-8 w-[105px] bg-black-50" />

          {/* Completed Button Loading */}
          <Skeleton className="h-8 w-[120px] bg-black-50" />

          {/* Search Input Loading */}
          <Skeleton className="h-8 w-[200px] bg-black-50" />
        </div>

        {/* Sort Button Loading */}
        <Skeleton className="h-8 w-[100px] bg-black-50" />
      </div>

      {/* Tags Carousel Loading */}
      <div className="w-full">
        <div className="flex gap-2 overflow-hidden">
          {Array.from({ length: 12 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-8 w-[80px] flex-shrink-0 bg-black-50"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
