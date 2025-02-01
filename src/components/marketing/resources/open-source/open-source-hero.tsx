import { Button } from "@/components/ui/button";
import GridPattern from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export default function ResourceOpenSourceHeroBlock() {
  return (
    <section className="pt-32 lg:pt-52 pb-36 relative">
      <div className="mt-28 z-10 absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#000] to-transparent pointer-events-none"></div>

      <div className="flex flex-col gap-y-3 z-20 relative items-center">
        <h1 className="text-center text-5xl lg:text-7xl !font-onest !font-medium tracking-tight text-gradient from-white to-white/75">
          Open Source
        </h1>
        <p className="text-gray-400 max-w-xl text-sm md:text-base font-onest text-center">
          All of our source code is available on GitHub for you to view and
          contribute to. It is open-source under the apache-2.0 license.
        </p>
        <div className="mt-2 flex gap-4">
          {/* <Button
            variant="default"
            href=""
          >
            View Roadmap
            <ArrowDown
              size={16}
              className="ml-2"
            />
          </Button> */}
          <Button
            href="https://github.com/techblitzdev/TechBlitz"
            className="text-black font-onest !bg-gradient-to-r !from-white !via-white/80 !to-white animate-shimmer bg-[length:200%_100%] transition-colors flex items-center gap-x-2"
          >
            <Star className="size-5 text-yellow-400 fill-yellow-300" />
            on GitHub!
          </Button>
        </div>
      </div>
      <GridPattern
        width={50}
        height={50}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn(
          "absolute inset-0 pt-44 [mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
        )}
      />
      <div className="z-10 absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#000] to-transparent pointer-events-none"></div>
    </section>
  );
}
