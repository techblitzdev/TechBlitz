import SignupForm from '@/components/marketing/global/waitlist-form';
import Link from 'next/link';
import AnimatedSpan from '@/components/ui/animated-span';
import { getTodaysQuestion } from '@/actions/questions/get-today';
import { ArrowRight } from 'lucide-react';

export default async function HomepageHero() {
  const dailyQuestion = await getTodaysQuestion();

  const animatedSpanContent = (
    <div className="flex items-center group">
      TechBlitz is now open to the public!
      <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-all duration-300" />
    </div>
  );

  return (
    <section
      id="#waitlist-form"
      className="pb-16 pt-28 md:pb-20 md:pt-32 xl:pb-40 xl:pt-56 grid grid-cols-12 gap-4 lg:gap-16 items-center"
    >
      <div className="flex flex-col gap-y-4 col-span-full items-center text-center">
        <Link href="/signup">
          <AnimatedSpan content={animatedSpanContent} />
        </Link>
        <h1 className="text-5xl lg:text-[68px] !font-onest !font-medium tracking-tight max-w-5xl">
          The ultimate platform to fast-track your coding career
        </h1>
        <h6 className="font-onest max-w-xl text-gray-400 text-lg">
          An{' '}
          <Link
            href="https://git.new/blitz"
            target="_blank"
            className="text-accent"
          >
            open-source
          </Link>
          , mobile-friendly coding platform designed to help you become an
          exceptional software engineer.
        </h6>
        {dailyQuestion && <SignupForm todayQuestion={dailyQuestion} />}
      </div>
    </section>
  );
}
