import { Button } from '@/components/ui/button';
import { Grid } from '@/components/ui/grid';
import { ChevronRight } from 'lucide-react';
import SignupForm from './waitlist-form';
import { getTodaysQuestion } from '@/utils/data/questions/get-today';

export default async function CallToActionBlock(opts: {
  title: string;
  description?: string;
  leftCta?: {
    title: string;
    href: string;
  };
  rightCta?: {
    title: string;
    href: string;
  };
}) {
  const { title, description, leftCta, rightCta } = opts;

  // get the daily question uid
  const dailyQuestion = await getTodaysQuestion();

  if (!dailyQuestion) {
    return null;
  }

  return (
    <section className="pt-10 pb-20 px-2 lg:px-0 space-y-7 text-center relative">
      <div
        aria-hidden="true"
        className="left-1/2 top-0 w-72 md:w-[600px] center pointer-events-none absolute h-px max-w-full -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.0) 0%, rgba(143, 143, 143, 0.67) 50%, rgba(0, 0, 0, 0) 100%)',
        }}
      ></div>
      <div className="space-y-2 z-50 relative max-w-xl place-self-center">
        <h1 className="text-3xl lg:text-5xl !font-onest !leading-[normal] text-gradient from-white to-white/55">
          {title}
        </h1>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>

      <div className="z-50 relative flex flex-col sm:flex-row gap-4 items-center justify-center">
        {process.env.NEXT_PUBLIC_ENV === 'development' ? (
          <>
            <Button
              variant="accent"
              size="lg"
              className="font-onest !bg-gradient-to-r !from-accent !via-white/20 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors"
              href={leftCta?.href || '/signup'}
            >
              <span>{leftCta?.title || 'Get Started'}</span>
            </Button>
            {rightCta && (
              <Button
                variant="secondary"
                size="lg"
                className="font-onest group"
                href={rightCta?.href || '/features'}
              >
                <span>{rightCta?.title || 'Learn More'}</span>
                <ChevronRight size={16} />
              </Button>
            )}
          </>
        ) : (
          <SignupForm />
        )}
      </div>
      <Grid size={30} position="bottom-right" />
      <div className="absolute inset-x-0 w-full bottom-0 h-20 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none"></div>
    </section>
  );
}
