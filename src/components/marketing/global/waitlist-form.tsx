'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/loading';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function WaitlistForm() {
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);
  const [challengeRedirecting, setChallengeRedirecting] = useState(false);

  const handleJoinClick = () => {
    setRedirecting(true);
    router.push('/signup');
  };

  const handleDemoClick = () => {
    setChallengeRedirecting(true);
    router.push('/daily-challenge');
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 w-full max-w-lg justify-center">
      <Button
        variant="accent"
        size="lg"
        onClick={handleJoinClick}
        className="flex-1"
      >
        {redirecting ? <LoadingSpinner /> : <>Start for free</>}
      </Button>

      <Button
        variant="default"
        size="lg"
        onClick={handleDemoClick}
        className="flex-1"
      >
        {challengeRedirecting ? (
          <LoadingSpinner />
        ) : (
          <>
            Try demo
            <ChevronRight className="ml-2 size-3" />
          </>
        )}
      </Button>
    </div>
  );
}
