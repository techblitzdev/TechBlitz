import LeftRightBlock from '@/components/marketing/global/left-right-block';

export default function FeatureLeftRightSectionThree() {
  return (
    <LeftRightBlock
      left={
        <div className="flex flex-col gap-y-6">
          <h2 className="text-2xl lg:text-4xl !font-onest !leading-[normal] text-gradient from-white to-white/55">
            Making progress has never been easier.
          </h2>
          <p className="text-white/70 max-w-xl text-base font-onest">
            TechBlitz tracks your progress and provides you with a streak count,
            showing you how many days in a row you've completed the challenge.
            Encouraging you to keep going.
          </p>
        </div>
      }
      right={
        <div className="flex flex-col gap-y-6">
          <h2 className="text-2xl lg:text-4xl !font-onest !leading-[normal] text-gradient from-white to-white/55">
            RIGHT SIDE CONTENT
          </h2>
        </div>
      }
    />
  );
}
