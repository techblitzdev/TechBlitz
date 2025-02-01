import RoadmapFeatureBox from "@/components/marketing/homepage/features/roadmap-feature-box";

export default function RoadmapGridItemTwo() {
  return (
    <div className="col-span-full md:col-span-6 pt-4 p-0 md:p-12 flex flex-col gap-10 relative">
      <div
        aria-hidden="true"
        className="block md:hidden left-1/2 top-0 !w-full center pointer-events-none absolute h-px max-w-full -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.0) 0%, rgba(143, 143, 143, 0.67) 50%, rgba(0, 0, 0, 0) 100%)",
        }}
      ></div>
      {/** top content */}
      <div className="flex flex-col gap-2.5">
        <h3 className="text-3xl text-gradient from-white to-white/75">
          Generate your roadmap
        </h3>
        <p className="text-gray-400">
          After assessing your skills, we create a personalized learning path
          with short-form challenges and interactive coding tasks.
        </p>
      </div>
      {/** bottom img */}
      <div className="relative">
        <RoadmapFeatureBox absolute={false} />
        <div className="z-10 absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#000] to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}
