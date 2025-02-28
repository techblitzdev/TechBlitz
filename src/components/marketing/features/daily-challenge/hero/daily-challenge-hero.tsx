import AnimatedSpan from '@/components/ui/animated-span';
import { Button } from '@/components/ui/button';
import GridPattern from '@/components/ui/grid-pattern';
import { cn } from '@/lib/utils';

export default function FeatureDailyChallengeHero(opts: {
  header?: string;
  subheader?: string;
  animatedSpan?: string;
  className?: string;
  ctaWrapperClassName?: string;
  leftCta?: {
    title: string;
    href: string;
  } | null;
  rightCta?: {
    title: string;
    href: string;
  } | null;
}) {
  const { header, subheader, animatedSpan, leftCta, rightCta, className, ctaWrapperClassName } =
    opts;

  return (
    <section className="relative flex gap-10 text-white overflow-hidden justify-center">
      <div
        className={cn(
          'flex flex-col gap-y-6 w-full xl:w-2/5 pt-32 lg:pt-52 pb-8 lg:pb-36 z-10 items-center',
          className
        )}
      >
        <AnimatedSpan content={animatedSpan || 'Daily Coding Challenges'} />
        <h1
          className="
            text-5xl lg:text-7xl !font-onest font-bold tracking-tight py-1.5 text-center
            text-transparent bg-clip-text bg-linear-to-r from-white to-white/75 leading-tight
          "
        >
          {header ? header : 'Simplify learning to code.'}
        </h1>

        <p className="text-white/70 max-w-xl text-base font-onest text-center">
          {subheader
            ? subheader
            : 'TechBlitz transforms learning to code into bite-sized, engaging daily coding challenges. Master new skills in just 5 minutes a day—anytime, anywhere, on any device. Even learn to code on your phone!'}
        </p>

        <div className={cn('flex flex-col items-center md:flex-row gap-4', ctaWrapperClassName)}>
          {/** if we pass in leftCta, we render it, otherwise, we fallback to the default */}
          {leftCta ? (
            <Button variant="accent" className="flex items-center gap-2" href={leftCta.href}>
              {leftCta.title}
            </Button>
          ) : (
            <Button variant="accent" className="flex items-center gap-2">
              Sign up
            </Button>
          )}

          {/** if we pass in rightCta, we render it, otherwise, we fallback to the default */}
          {rightCta ? (
            <Button variant="default" className="flex items-center gap-2" href={rightCta.href}>
              {rightCta.title}
            </Button>
          ) : (
            <Button variant="default" className="flex items-center gap-2" href={`/roadmaps`}>
              Explore roadmaps
            </Button>
          )}
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
      <div className="z-10 absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-[#000] to-transparent pointer-events-none"></div>
    </section>
  );
}
