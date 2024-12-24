import LeftRightBlock from '@/components/marketing/global/left-right-block';
import Image from 'next/image';
import mobileDailyChallenge from '../../../../../public/images/mobile-daily-question.png';

export default function FeatureLeftRightSectionTwo() {
  return (
    <LeftRightBlock
      left={
        <div className="flex flex-col gap-y-6 relative h-[400px] md:h-[500px] lg:h-[600px] w-1/2 overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src={mobileDailyChallenge}
              alt="Mobile view of daily coding challenge"
              width={1000}
              height={1000}
              className="object-cover object-top rounded-lg"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10" />
          </div>
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
