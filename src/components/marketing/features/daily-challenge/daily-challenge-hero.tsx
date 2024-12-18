import AnimatedSpan from '@/components/ui/animated-span';
import { Button } from '@/components/ui/button';

export default function FeatureDailyChallengeHero() {
  return (
    <section className="relative flex gap-10 text-white overflow-hidden">
      <div className="flex flex-col gap-y-6 w-2/5 pt-32 lg:pt-52 pb-36 z-10 pl-12">
        <AnimatedSpan content="Daily Coding Challenges" />
        <h1
          className="text-5xl lg:text-6xl !font-onest font-bold tracking-tight py-1.5
          text-transparent bg-clip-text bg-gradient-to-r from-white to-white/75 leading-tight"
        >
          Crack the Code, Every Day
        </h1>

        <p className="text-white/70 max-w-xl text-base font-onest">
          Code challenges do not need to be time consuming or boring. With
          techblitz, you can learn something new every day, in 5 minutes, from
          any device.
        </p>

        <div className="flex gap-4">
          <Button
            variant="default"
            className="flex items-center gap-2"
          >
            Today's Challenge
          </Button>
          <Button
            variant="accent"
            className="flex items-center gap-2"
          >
            Sign Up
          </Button>
        </div>
      </div>

      <div className="w-3/5 relative">
        <div
          className="
						bg-black-75 border border-black-50 h-96 w-72 absolute -top-40 right-80 
          	rounded-2xl backdrop-blur-sm
					"
        ></div>
        <div
          className="
						bg-black-75 border border-black-50 h-96 w-72 absolute top-64 right-80 
          	rounded-2xl backdrop-blur-sm z-20
					"
        ></div>
        <div
          className="
						bg-black-75 border border-black-50 h-96 w-72 absolute right-0 
          	rounded-2xl backdrop-blur-sm
					"
        ></div>
        <div
          className="
						bg-black-75 border border-black-50 h-96 w-72 absolute top-[26rem] right-0 
          	rounded-2xl backdrop-blur-sm
					"
        ></div>

        {/** gradient fade */}
        <div className="z-10 absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#000] to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
}
