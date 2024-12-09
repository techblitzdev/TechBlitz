import { Button } from '@/components/ui/button';
import { Grid } from '@/components/ui/grid';
import { Separator } from '@/components/ui/separator';
import { ChevronRight } from 'lucide-react';
import { WaitlistForm } from '../waitlist-form';

export default function CallToActionBlock(opts: {
  title: string;
  description?: string;
}) {
  const { title, description } = opts;

  return (
    <section className="pt-10 pb-20 space-y-7 text-center relative">
      <div
        aria-hidden="true"
        className="left-1/2 top-0 w-72 md:w-[600px] center pointer-events-none absolute h-px max-w-full -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.0) 0%, rgba(143, 143, 143, 0.67) 50%, rgba(0, 0, 0, 0) 100%)'
        }}
      ></div>
      <div className="space-y-2 z-50 relative max-w-xl place-self-center">
        <h1 className="text-3xl lg:text-5xl !font-onest !leading-[normal] text-gradient from-white to-white/55">
          {title}
        </h1>
        <p className="text-gray-400 text-lg">{description}</p>
      </div>

      <Button
        variant="accent"
        className="relative z-10 rounded-full font-onest !bg-gradient-to-r !from-accent !via-white/20 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors"
      >
        dub.sh/blitz
      </Button>

      {/* <div className="z-50 relative flex flex-col sm:flex-row gap-4 items-center justify-center">
        {process.env.NEXT_PUBLIC_ENV === 'development' ? (
          <>
            <Button
              variant="accent"
              size="lg"
              className="font-onest !bg-gradient-to-r !from-accent !via-white/20 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors"
              href="/signup"
            >
              <span>Get Started</span>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="font-onest group"
              href="/features"
            >
              <span>Learn More</span>
              <ChevronRight size={16} />
            </Button>
          </>
        ) : (
          <WaitlistForm />
        )}
      </div> */}
      <Grid
        size={30}
        position="bottom-right"
      />
      <div className="absolute inset-x-0 w-full bottom-0 h-20 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none"></div>
    </section>
  );
}
