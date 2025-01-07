import SignupForm from '@/components/marketing/global/waitlist-form';
import Link from 'next/link';
import AnimatedSpan from '@/components/ui/animated-span';
import { getTodaysQuestion } from '@/actions/questions/get-today';
import { ArrowRight } from 'lucide-react';

export default async function HomepageHero() {
  const dailyQuestion = await getTodaysQuestion();

  const animatedSpanContent = (
    <div className="flex items-center group">
      Limited Time Offer: 50% Student Discount - Lock in Lifetime Access Today!
      <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-all duration-300" />
    </div>
  );

  return (
    <section
      id="#waitlist-form"
      className="pb-16 pt-28 md:pb-20 md:pt-32 xl:pb-40 xl:pt-56 grid grid-cols-12 gap-4 lg:gap-16 items-center"
    >
      <div className="flex flex-col gap-y-4 col-span-full items-center text-center">
        <Link href="/pricing">
          <AnimatedSpan content={animatedSpanContent} />
        </Link>
        <h1 className="mt-3 text-5xl lg:text-[68px] !font-onest !font-medium tracking-tight max-w-5xl">
          Learn to code, <br /> faster
        </h1>
        <h6 className="font-onest max-w-3xl text-gray-400 text-lg">
          Improve your coding ability effortlessly, with our short-form,
          personalized challenges.
          <br />
          Accelerate your programming knowledge in less than 10 minutes per day.
        </h6>
        {dailyQuestion && (
          <div className="mt-3">
            <SignupForm todayQuestion={dailyQuestion} />
          </div>
        )}
      </div>
    </section>
  );
}
