// dynamic import
import dynamic from 'next/dynamic';

// this slows down the page speed a bunch (by 30 points in Lighthouse)
// import it like this as we don't need it on the server
const CodeComparison = dynamic(() => import('./code-comparison'), {
  ssr: false
});

export default function ComparisonBlock() {
  return (
    <section className="pt-10 lg:pt-6 pb-20 md:pb-28 flex flex-col gap-y-7 relative items-center w-full">
      <div className="flex flex-col gap-y-3 items-center text-center">
        <h1 className="text-4xl lg:text-6xl font-onest !font-medium tracking-tight text-gradient from-white to-white/55 py-1">
          Real life software problems
        </h1>
        <p className="text-gray-400 max-w-2xl text-sm md:text-base">
          We don't just create challenges to 'pass the technical interview'. We
          create real life software challenges that you will face in your
          day-to-day activities.
        </p>
      </div>
      <div className=" w-full flex justify-center relative">
        <div
          aria-hidden="true"
          className="left-1/2 top-0 w-72 md:w-[600px] center pointer-events-none absolute h-px max-w-full -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.0) 0%, rgba(143, 143, 143, 0.67) 50%, rgba(0, 0, 0, 0) 100%)'
          }}
        ></div>
        <CodeComparison />
      </div>
    </section>
  );
}
