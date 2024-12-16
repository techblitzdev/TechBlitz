export default function RoadmapGridItemOne() {
  return (
    <div className="md:border-r md:border-black-50 col-span-full md:col-span-6 p-10">
      {/** left side image */}
      <div className="col-span-6">
        <div className="flex flex-col gap-4">
          <h3 className="text-3xl text-gradient from-white to-white/75">
            Analyze your current skill level
          </h3>
          <p className="text-gray-400">
            First, we need to understand how much you already know. We start by
            getting you to answer a few coding questions to gauge your current
            skill level.
          </p>
        </div>
        {/** right side content */}
        <div className="col-span-6">
          <div className="border border-black-50 rounded-lg h-full"></div>
        </div>
      </div>
    </div>
  );
}
