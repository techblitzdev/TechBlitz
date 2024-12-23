import LeftRightBlock from '@/components/marketing/global/left-right-block';
import Image from 'next/image';
import mobileDailyChallenge from '../../../../../public/images/mobile-daily-question.png';

export default function FeatureLeftRightSectionTwo() {
  return (
    <LeftRightBlock
      left={
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10" />
        </div>
      }
      right={
        <div className="flex flex-col gap-y-6">
          <h2 className="text-2xl lg:text-4xl !font-onest !leading-[normal] text-gradient from-white to-white/55">
            Coding at your convenience.
          </h2>
          <p className="text-white/70 max-w-xl text-base font-onest">
            Unable to get to a computer? No problem. TechBlitz questions can be
            completed from the comfort of your phone, enabling you to learn on
            the go.
          </p>
        </div>
      }
    />
  );
}
