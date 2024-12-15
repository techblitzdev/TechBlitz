import ComparisonDeviceShowcase from './comparison-device-showcase';

export default function ComparisonBlock() {
  return (
    <section className="pt-10 lg:pt-6 pb-10 md:pb-28 flex flex-col gap-y-7 relative items-center w-full">
      <div className="flex flex-col gap-y-3 items-center text-center">
        <h1 className="text-2xl lg:text-5xl font-onest leading-normal text-gradient from-white to-white/55 py-1">
          Code on the go
        </h1>
        <p className="text-gray-400 max-w-2xl">
          Learn to code from the comfort of your home, or on the go. Our
          platform is designed to work on any device.
        </p>
      </div>
      {/** the bento grid */}
      <div className="border-t border-black-50 w-full max-w-6xl grid grid-cols-2">
        <ComparisonDeviceShowcase />
      </div>
    </section>
  );
}
