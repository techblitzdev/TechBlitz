import AnimatedSpan from '@/components/ui/animated-span';
import dynamic from 'next/dynamic';
const AnimatedBeamMultipleOutput = dynamic(
  () => import('@/components/ui/animated-beams-multiple-inputs'),
  { ssr: false }
);

export default function FeatureRoadmapIntegrationBlock() {
  return (
    <section className="pt-24 pb-32 grid grid-cols-12 gap-8 items-center">
      <div className="flex flex-col gap-y-4 col-span-full md:col-span-5">
        <AnimatedSpan content="Personalized" />
        <h2 className="text-2xl lg:text-5xl !font-onest !leading-[normal] text-gradient from-white to-white/55">
          Created for Developers
        </h2>
        <p className="text-gray-400 max-w-3xl">
          Our roadmap feature is designed to help developers learn new skills
          and advance their careers (or get their career started!).
        </p>
      </div>
      <AnimatedBeamMultipleOutput className="col-span-full md:col-span-7" />
    </section>
  );
}
