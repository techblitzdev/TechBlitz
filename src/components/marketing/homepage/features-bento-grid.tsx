export default function FeaturesBentoGrid() {
  return (
    <div className="pt-28 pb-20 flex flex-col gap-y-5">
      <h1 className="text-xl lg:text-3xl font-inter !font-medium !leading-[normal] text-center">
        Everything you need to become a better developer
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-3 border border-white rounded-lg p-4">
          Main feature
        </div>
        <div className="col-span-1 border border-white rounded-lg p-4">
          Main feature 2
        </div>
        <div className="col-span-1 border border-white rounded-lg p-4">
          Feature 3
        </div>
        <div className="col-span-1 border border-white rounded-lg p-4">
          feature 4
        </div>
        <div className="col-span-2 border border-white rounded-lg p-4">
          Feature 5
        </div>
      </div>
    </div>
  );
}
