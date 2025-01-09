import Link from 'next/link';

import { Button } from '@/components/ui/button';
import GithubLogo from '@/components/ui/icons/github';
import { UserIcon } from 'lucide-react';
import NumberFlow from '@number-flow/react';

import { Question } from '@/types/Questions';
import { cn } from '@/lib/utils';

export default function SocialProof({
  userCount,
  githubStars,
  dailyQuestion,
  padding = 'py-16 md:py-24 md:pt-40',
  showDescription = true,
}: {
  userCount: number;
  githubStars: number;
  dailyQuestion: Question | null;
  padding?: string;
  showDescription?: boolean;
}) {
  return (
    <section className={cn('relative', padding)}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl !font-onest !leading-[normal] text-gradient from-white to-white/55 mb-3">
              Empowering Developers Worldwide
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
              <div className="flex items-center gap-x-2">
                <UserIcon className="size-6 text-white" />
                <span className="text-base text-white font-onest">
                  <NumberFlow value={userCount} />+ Developers
                </span>
              </div>
              <Link
                href="https://github.com/techblitzdev/TechBlitz"
                target="_blank"
                className="flex items-center gap-x-2"
              >
                <GithubLogo className="size-6" />
                <span className="text-base text-white font-onest">
                  <NumberFlow value={githubStars} /> GitHub Stars
                </span>
              </Link>
            </div>
            {showDescription && (
              <p className="text-gray-400 mb-8">
                Join a thriving community of developers who are revolutionizing
                their coding skills and fast-tracking their careers with our
                cutting-edge platform.
              </p>
            )}
          </div>

          {dailyQuestion && (
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Button
                variant="secondary"
                size="lg"
                href={`/question/${dailyQuestion?.uid}`}
                aria-label="Navigate to the Daily Challenge"
              >
                Try the demo
              </Button>
              <Button
                variant="default"
                size="lg"
                href="/features/daily-challenges"
                aria-label="Navigate to Daily Challenges"
              >
                Learn more
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
