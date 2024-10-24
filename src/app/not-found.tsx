'use client';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/loading';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CountUp from 'react-countup';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getTodaysQuestion } from '@/actions/questions/get-today';
import Link from 'next/link';

export default function NotFound() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    data: todaysQuestion,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['not-found'],
    queryFn: () => getTodaysQuestion(),
  });

  const goBack = () => {
    setLoading(true);
    router.push('/dashboard');
  };

  const goToDailyQuestion = () =>
    router.push(`/question/${todaysQuestion?.uid}`);

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-dot-white/[0.2] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <div className="flex flex-col text-center gap-x-5 items-center font-inter">
        <CountUp
          end={404}
          className="min-h-24 text-8xl font-semibold"
          duration={2}
        />
        <div className="flex flex-col max-w-96 items-center">
          <p className="text-sm w-[90%]">
            Sorry, it look's like the page you have requested could not be
            found.
          </p>
          <div className="mt-4 flex flex-col md:flex-row gap-4 self-center justify-center w-[75%] md:w-auto">
            <Link
              href="/dashboard"
              prefetch
              className="self-center text-black inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-white text-primary-foreground shadow hover:bg-white/90 h-9 px-4 py-2"
            >
              Back to dashboard
            </Link>
            {isError || !todaysQuestion?.uid ? (
              ''
            ) : (
              <Button variant="default" onClick={goToDailyQuestion}>
                {isLoading ? <LoadingSpinner /> : 'Go to daily question'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
