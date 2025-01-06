import { getTodaysQuestion } from '@/actions/questions/get-today';
import AnimatedSpan from '@/components/ui/animated-span';
import { Button } from '@/components/ui/button';
import GridPattern from '@/components/ui/grid-pattern';
import { cn } from '@/utils/cn';

export default async function FeatureDailyChallengeHero() {
  const dailyQuestion = await getTodaysQuestion();

  return (
    <section className="relative flex gap-10 text-white overflow-hidden justify-center">
      <div className="flex flex-col gap-y-6 w-full xl:w-2/5 pt-32 lg:pt-52 pb-8 lg:pb-36 z-10 items-center">
        <AnimatedSpan content="Daily Coding Challenges" />
        <h1
          className="
            text-5xl lg:text-7xl !font-onest font-bold tracking-tight py-1.5 text-center
            text-transparent bg-clip-text bg-gradient-to-r from-white to-white/75 leading-tight
          "
        >
          Simplify learning to code.
        </h1>

        <p className="text-white/70 max-w-xl text-base font-onest text-center">
          TechBlitz transforms coding challenges into bite-sized, engaging
          experiences. Master new skills in just 5 minutes a day—anytime,
          anywhere, on any device.
        </p>

        <div className="flex gap-4">
          <div className="flex flex-col gap-y-2">
            <Button
              variant="default"
              className="flex items-center gap-2"
              href={`/question/${dailyQuestion?.uid}`}
            >
              Answer today's challenge
            </Button>
          </div>
          <Button variant="accent" className="flex items-center gap-2">
            Sign up
          </Button>
        </div>
      </div>

      <GridPattern
        width={50}
        height={50}
        x={-1}
        y={-1}
        strokeDasharray={'4 2'}
        className={cn(
          'absolute inset-0 pt-44 [mask-image:radial-gradient(400px_circle_at_center,white,transparent)]'
        )}
      />
      <div className="z-10 absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#000] to-transparent pointer-events-none"></div>
    </section>
  );
}
