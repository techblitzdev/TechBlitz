import Link from 'next/link';
import AnimatedSpan from '@/components/ui/animated-span';
import { ArrowRight } from 'lucide-react';
import HeroText from './text-rotate';
import { Button } from '@/components/ui/button';
import GoogleSignUp from './google-sign-up';
import { useUserServer } from '@/hooks/use-user-server';

export default async function HomepageHero() {
  const animatedSpanContent = (
    <div className="flex items-center group">
      <span className="hidden md:block">Free study paths now available!</span>
      <span className="block md:hidden">Free study paths now available!</span>
      <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-all duration-300" />
    </div>
  );

  // i need to test this on prod. - i think it's working but i'm not sure
  // TODO: remove this once i've tested it on prod
  const user = await useUserServer();

  return (
    <section className="pb-16 pt-28 md:pb-20 md:pt-32 xl:pb-40 xl:pt-56 grid grid-cols-12 gap-4 lg:gap-16 items-center">
      <div className="flex flex-col gap-y-2 col-span-full items-center text-center">
        <Link href="/changelog">
          <AnimatedSpan content={animatedSpanContent} />
        </Link>
        <h1 className="mt-3 text-5xl lg:text-[68px] !font-onest !font-medium tracking-tight max-w-5xl py-1.5 items-center">
          <span className=" text-gradient from-white to-white/75">
            Learning to code <br />
          </span>
          <HeroText />
        </h1>
        <p className="font-onest max-w-4xl text-gray-400 text-lg">
          Replace boring coding exercises with industry-standard coding challenges. <br /> Your
          dream career in tech is just a click away.
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
          {user?.userLevel === 'ADMIN' && <GoogleSignUp />}
          <Button
            variant={user?.userLevel === 'ADMIN' ? 'default' : 'accent'}
            size="lg"
            href="/signup"
            className="flex-1 px-5 flex items-center group"
          >
            {user?.userLevel === 'ADMIN' ? 'Sign up with email' : 'Sign up for free'}
            <ArrowRight
              size={16}
              className="ml-1 size-4 group-hover:translate-x-1 transition-all duration-300"
            />
          </Button>
        </div>
      </div>
    </section>
  );
}
