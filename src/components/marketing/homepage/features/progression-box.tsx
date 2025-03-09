import dynamic from 'next/dynamic';

const ProgressChart = dynamic(() => import('./progression-chart'), {
  ssr: false,
});

export default function ProgressionBentoBox() {
  return (
    <>
      {/* Top Card */}
      <div className="overflow-hidden absolute z-10 top-40 md:top-32 flex flex-col gap-4 w-full rounded-lg transition-all duration-300">
        <ProgressChart />
      </div>
    </>
  );
}
