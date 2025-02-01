import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import RoadmapFeatureBoxAnimation from "../../features/roadmap/grid/roadmap-feature-box-animation";
import { Suspense } from "react";

export default function RoadmapFeatureBox(opts: { absolute?: boolean }) {
  const { absolute = true } = opts;

  return (
    <Card
      style={{
        background:
          "radial-gradient(128% 107% at 0% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)",
      }}
      className={cn(
        "group-hover:scale-[1.03] duration-300 pb-3 rounded-bl-none max-w-md lg:max-w-lg xl:max-w-2xl border-black-50 bg-black-75 shadow-md z-50",
        absolute && " absolute -right-3 top-44 sm:top-32 md:top-24 lg:top-28",
      )}
    >
      <Suspense
        fallback={<div className="min-h-[258px] w-full animate-pulse"></div>}
      >
        <RoadmapFeatureBoxAnimation absolute={absolute} />
      </Suspense>
    </Card>
  );
}
