import { cn } from '@/lib/utils';
import GoogleSignUp from '../homepage/hero/google-sign-up';
import { useUserServer } from '@/hooks/use-user-server';
import { Button } from '@/components/ui/button';

interface PseoHeroProps {
  header: string;
  className?: string;
  subheader: string;
}

export default function PseoHero({ header, className, subheader }: PseoHeroProps) {
  const userPromise = useUserServer();

  return (
    <section className="relative flex gap-10 text-white overflow-hidden justify-center">
      <div
        className={cn(
          'flex flex-col gap-y-6 w-full xl:w-2/5 pt-32 lg:pt-52 pb-8 lg:pb-36 z-10 items-center',
          className
        )}
      >
        <h1
          className="
                text-5xl lg:text-7xl !font-onest font-bold tracking-tight py-1.5 text-center
                text-transparent bg-clip-text bg-gradient-to-r from-white to-white/75 leading-tight
              "
        >
          {header}
        </h1>
        {subheader && (
          <p className="text-white/70 max-w-xl text-base font-onest text-center">{subheader}</p>
        )}

        <div className={cn('flex flex-col items-center md:flex-row gap-4')}>
          {/** google signup cta */}
          <GoogleSignUp userPromise={userPromise} />
          {/** signup page cta */}
          <Button variant="default" className="flex items-center gap-2" href="/signup">
            Sign up
          </Button>
        </div>
      </div>
    </section>
  );
}
