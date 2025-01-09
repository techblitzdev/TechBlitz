import dynamic from 'next/dynamic';

const ProgressChart = dynamic(() => import('./progression-chart'), {
  ssr: false,
});

export default function ProgressionBentoBox() {
  return (
    <>
      {/* Top Card */}
      <div className="overflow-hidden absolute z-10 top-28 flex flex-col gap-4 w-full rounded-lg transition-all duration-300">
        <ProgressChart />
      </div>
      {/* Bottom Card */}
      <div
        className="overflow-hidden absolute z-0 top-28 flex flex-col gap-4 w-full rounded-lg transition-all duration-300"
        style={{
          background:
            'radial-gradient(128% 107% at 100% 100%, #212121 0%, rgb(0,0,0) 77.61%)',
          transformOrigin: 'center center',
        }}
      >
        <ProgressChart />
      </div>
    </>
  );
}
