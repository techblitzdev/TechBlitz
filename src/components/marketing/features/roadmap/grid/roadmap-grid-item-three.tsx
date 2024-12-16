export default function RoadmapGridItemThree() {
  return (
    <div className="grid grid-cols-12 gap-10">
      {/** left side image */}
      <div className="col-span-6">
        <div className="border border-black-50 rounded-lg h-full"></div>
      </div>
      {/** right side content */}
      <div className="col-span-6">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl text-gradient from-white to-white/75">
            Answer, Learn, Repeat
          </h3>
          <p className="text-gray-400">
            When you have completed your roadmap, you can easily generate more
            question sets to keep learning and improving your skills. Or, you
            can start a new roadmap!
          </p>
        </div>
      </div>
    </div>
  );
}
