import LeftRightBlock from '@/components/marketing/global/left-right-block';
import Image from 'next/image';
import mobileDailyChallenge from '../../../../../public/images/mobile-daily-question.png';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from '@radix-ui/react-icons';

export default function FeatureLeftRightSectionTwo() {
  return (
    <LeftRightBlock
      left={
        <div className="flex flex-col gap-y-6">
          <Image
            src={mobileDailyChallenge}
            alt="Phone"
            width={350}
            height={600}
          />
        </div>
      }
      right={
        <div className="flex flex-col gap-y-6">
          <h2 className="text-2xl lg:text-4xl !font-onest !leading-[normal] text-gradient from-white to-white/55">
            Code on the go.
          </h2>
          <p className="text-white/70 max-w-xl text-base font-onest">
            Unable to get to a computer? No problem. TechBlitz questions can be
            completed from the comfort of your phone, enabling you to learn on
            the go.
          </p>
          <Button
            href="/daily-challenge"
            variant="secondary"
            className="flex items-center gap-x-2 w-fit"
          >
            Try today's challenge
            <ArrowRightIcon className="size-4" />
          </Button>
        </div>
      }
    />
  );
}
