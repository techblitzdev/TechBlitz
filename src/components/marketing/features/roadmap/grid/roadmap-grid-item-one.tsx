export default function RoadmapGridItemOne() {
  return (
    <div className="relative col-span-full md:col-span-6 p-12 flex flex-col gap-10">
      <div className="flex flex-col gap-2.5">
        <h3 className="text-3xl text-gradient from-white to-white/75">
          Analyze your skills
        </h3>
        <p className="text-gray-400">
          First, we need to understand how much you already know. We start by
          getting you to answer a few coding questions to gauge your current
          skill level.
        </p>
      </div>
      {/** bottom content */}
      <div className="col-span-6">
        <div className="border border-black-50 rounded-lg h-full"></div>
      </div>
      <div
        aria-hidden="true"
        className="hidden md:block absolute right-0 top-0 h-full w-px pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(143, 143, 143, 0.67) 0%, rgba(0, 0, 0, 0) 100%)'
        }}
      ></div>
    </div>
  );
}
