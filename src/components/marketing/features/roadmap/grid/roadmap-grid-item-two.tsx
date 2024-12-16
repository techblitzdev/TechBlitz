import RoadmapFeatureBox from '@/components/marketing/homepage/features/roadmap-feature-box';

export default function RoadmapGridItemTwo() {
  return (
    <div className="col-span-full md:col-span-6 pb-0 p-12 flex flex-col gap-10">
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
