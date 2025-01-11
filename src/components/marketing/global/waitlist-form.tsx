'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/loading';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SignupForm() {
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  const handleJoinClick = () => {
    setRedirecting(true);
    router.push('/signup');
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row items-center gap-4 w-full max-w-lg justify-center">
        <Button
          variant="accent"
          size="lg"
          onClick={handleJoinClick}
          className="flex-1 px-5"
        >
          {redirecting ? <LoadingSpinner /> : 'Start for free'}
        </Button>

        <Button
          href={`/questions`}
          variant="default"
          size="lg"
          className="group px-5"
        >
          Browse questions
          <ChevronRight className="ml-2 size-4 group-hover:translate-x-1 transition-all" />
        </Button>
      </div>
    </div>
  );
}
