import AnimatedSpan from '@/components/ui/animated-span';
import { Button } from '@/components/ui/button';
import FeatureDailyChallengeHeroGraphic from './graphic';

export default function FeatureDailyChallengeHero() {
  return (
    <section className="relative flex gap-10 text-white overflow-hidden">
      <div className="flex flex-col gap-y-6 w-2/5 pt-32 lg:pt-52 pb-36 z-10 pl-12">
        <AnimatedSpan content="Daily Coding Challenges" />
        <h1
          className="text-5xl lg:text-6xl !font-onest font-bold tracking-tight py-1.5
          text-transparent bg-clip-text bg-gradient-to-r from-white to-white/75 leading-tight"
        >
          Coding costs time and money, we eliminate both.
        </h1>

        <p className="text-white/70 max-w-xl text-base font-onest">
          Code challenges do not need to be time consuming or boring. With
          techblitz, you can learn something new every day. In 5 minutes, from
          any device.
        </p>

        <div className="flex gap-4">
          <Button
            variant="default"
            className="flex items-center gap-2"
          >
            Answer today's challenge
          </Button>
          <Button
            variant="accent"
            className="flex items-center gap-2"
          >
            Sign up
          </Button>
        </div>
      </div>

      <div className="w-3/5 relative">
        <FeatureDailyChallengeHeroGraphic />
      </div>
    </section>
  );
}
