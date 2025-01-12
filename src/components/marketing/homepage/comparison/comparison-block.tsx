import CodeComparison from './code-comparison';

export default async function ComparisonBlock() {
  return (
    <section className="pt-10 lg:pt-6 pb-20 md:pb-28 flex flex-col gap-y-7 relative items-center w-full">
      <div className="flex flex-col gap-y-3 items-center text-center">
        <h1 className="text-4xl lg:text-6xl font-onest !font-medium tracking-tight text-gradient from-white to-white/55 py-1">
          Learn with interactive <br /> coding challenges
        </h1>
        <p className="text-gray-400 max-w-4xl text-sm md:text-base">
          Discover why TechBlitz is the best free LeetCode alternative for
          beginners. Our coding challenges are designed to mimic real-world
          problems that you will face in your day-to-day activities.
        </p>
      </div>
      <div className=" w-full flex justify-center relative">
        <div
          aria-hidden="true"
          className="left-1/2 top-0 w-72 md:w-[600px] center pointer-events-none absolute h-px max-w-full -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.0) 0%, rgba(143, 143, 143, 0.67) 50%, rgba(0, 0, 0, 0) 100%)',
          }}
        ></div>
        <CodeComparison />
      </div>
    </section>
  );
}
