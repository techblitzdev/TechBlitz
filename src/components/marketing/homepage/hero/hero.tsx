import dynamic from 'next/dynamic';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUserServer } from '@/hooks/use-user-server';
import type { UserRecord } from '@/types/User';
import { Suspense, use } from 'react';
import Image from 'next/image';
import JakeMackieTestimonial from '@/public/images/testimonials/jake-mackie-techblitz-testimonial.jpeg';
import Link from 'next/link';

const HeroImageFollow = dynamic(() => import('./hero-image-follow'), {
  ssr: false,
  loading: () => null,
});

const HeroText = dynamic(() => import('./text-rotate'), {
  ssr: false,
  loading: () => (
    <span className="text-gradient from-white to-white/75 text-focus-in flex justify-center whitespace-pre tracking-tighter text-center pr-3 pb-2 md:pb-4">
      made easy
    </span>
  ),
});

const GoogleSignUp = dynamic(() => import('./google-sign-up'), {
  ssr: false,
  loading: () => <div className="h-10"></div>,
});

const Buttons = ({ user }: { user: Promise<UserRecord | null> }) => {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-4 relative z-10">
      <GoogleSignUp userPromise={user} />
      {!user ? (
        <Button
          variant="default"
          size="lg"
          href="/signup"
          className="flex-1 px-6 py-6 flex items-center group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/90"
        >
          Sign up with email
          <ArrowRight
            size={16}
            className="ml-2 size-4 group-hover:translate-x-1 transition-all duration-300"
          />
        </Button>
      ) : (
        <Button
          variant="default"
          size="lg"
          href="/roadmaps"
          className="flex-1 flex items-center group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/90"
        >
          View study paths
          <ArrowRight
            size={16}
            className="ml-2 size-4 group-hover:translate-x-1 transition-all duration-300"
          />
        </Button>
      )}
    </div>
  );
};

const textItems = [
  {
    text: 'Roadmaps',
    href: '/features/roadmap',
  },
  {
    text: 'Coding Stats',
    href: '/features/statistics',
  },
  {
    text: 'Leaderboards',
    href: '/features/leaderboard',
  },
  { text: 'Coding Challenges', href: '/features/coding-challenges' },
];
export default function HomepageHero({ userCountPromise }: { userCountPromise: Promise<number> }) {
  const user = useUserServer();
  const userCount = Math.round(use(userCountPromise) / 10) * 10;

  const userImages = [
    'https://avatars.githubusercontent.com/u/40324275?v=4',
    'https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/user-profile-pictures/3a57d7e8-8b80-483b-93d0-70fe1f06b0c0/logo.png?u=46qm6f0j3iw',
    JakeMackieTestimonial,
  ];

  return (
    <section className="relative pb-16 pt-28 md:pb-20 md:pt-32 xl:pb-40 xl:pt-56 grid grid-cols-12 gap-4 lg:gap-16 items-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background to-background/0 z-0"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-20"></div>

      <div className="flex flex-col gap-y-2 col-span-full items-center text-center relative z-10">
        <h1 className="mt-3 text-5xl lg:text-[72px] !font-onest !font-medium tracking-tight leading-[1.1] max-w-5xl py-1.5 items-center">
          <span className="tracking-tighter text-gradient from-white to-white/75 text-focus-in animate-fade-in-up">
            Learning to code
          </span>
          <br />
          <div className="h-28 lg:h-16 animate-fade-in-up [animation-delay:300ms]">
            <HeroText />
          </div>
        </h1>

        <p className="font-onest max-w-3xl text-gray-300 text-xl tracking-tight mt-6 md:mt-2 text-focus-in animate-fade-in-up [animation-delay:600ms] leading-relaxed">
          Learn to code with free, fun coding challenges and study paths.
          <br className="hidden md:block" />
          Take the first step today and begin your journey to your dream career in tech.
        </p>

        <div className="animate-fade-in-up [animation-delay:900ms] w-full max-w-xl">
          <Suspense fallback={null}>
            <Buttons user={user} />
          </Suspense>
        </div>

        {/* User avatars */}
        <div className="flex justify-center mt-16 animate-fade-in-up [animation-delay:1000ms]">
          <div className="flex -space-x-4">
            {userImages.map((src, index) => (
              <div
                key={index}
                className="relative size-10 border-2 border-black rounded-full overflow-hidden ring-2 ring-primary/20"
              >
                <Image
                  src={src || '/placeholder.svg'}
                  alt={`User ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            <div className="flex items-center justify-center size-10 text-xs font-medium text-white bg-primary border-2 border-black rounded-full ring-2 ring-primary/20 bg-black z-10">
              +{Math.min(999, userCount - userImages.length)}
            </div>
          </div>
        </div>

        <div className="mb-8 text-sm font-medium text-gray-400 animate-fade-in-up [animation-delay:1050ms]">
          Join {userCount}+ developers unlocking their potential and revolutionizing their tech
          careers
        </div>

        <div className="py-8 animate-fade-in-up [animation-delay:1200ms] max-w-6xl relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl blur-md"></div>
          <div className="relative rounded-lg border border-black-50 border-opacity-50 blur-[0.3px] shadow-2xl group">
            {/* Main image */}
            <Image
              src="https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images//Screenshot%202025-03-14%20at%2022.40.40-min%202.png"
              alt="TechBlitz study path interface showing interactive coding challenges and learning progress"
              width={1200}
              height={675}
              className="rounded-lg transition-all duration-300 group-hover:blur-sm"
              priority
              loading="eager"
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAyVC08MTY3LjIyOUFTRjo/Tj4yMkhiSk46NjU1Rk5MPT9APz9APz9APz//2wBDAR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />

            <HeroImageFollow className="hidden md:block" />

            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                href="/signup"
                variant="ghost"
                className="px-6 py-3 bg-primary text-white font-medium rounded-lg shadow-lg hover:bg-primary/90 transition-all transform hover:scale-105"
              >
                Explore Now!
                <ArrowRight className="ml-2 size-3" />
              </Button>
            </div>
          </div>
          <div className="pt-5 flex flex-col text-sm gap-2 place-self-start items-start text-gray-400 animate-fade-in-up [animation-delay:1200ms]">
            <h6 className="font-medium text-xs text-gray-400">
              The all in one solution to learn how to code:
            </h6>
            <div className="flex flex-wrap gap-2">
              {textItems.map((item, index) => (
                <div
                  key={index}
                  className="text-gradient from-white to-white/75 text-focus-in font-onest"
                >
                  <Link href={item.href} className="hover:text-accent duration-300">
                    {item.text}
                  </Link>
                  {index < textItems.length - 1 && <span className="text-gray-400 pl-2">•</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
