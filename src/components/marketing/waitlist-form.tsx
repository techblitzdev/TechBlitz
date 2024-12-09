'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { InputWithLabel } from '@/components/ui/input-label';
import { addToWaitlist } from '@/actions/waitlist/add';
import { toast } from 'sonner';
import posthog from 'posthog-js';
import { ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getTodaysQuestion } from '@/actions/questions/get-today';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../ui/loading';

export function WaitlistForm() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      await addToWaitlist(email);
      setIsSubmitting(false);
      toast.success('You have been added to the waitlist!');

      posthog.capture('waitlist_signup', { email });
    } catch (error) {
      setIsSubmitting(false);
      toast.error('Failed to add you to the waitlist. Please try again');
    }
  };

  // get the daily challenge
  const { data, isLoading, isError } = useQuery({
    queryKey: ['daily-challenge'],
    queryFn: () => getTodaysQuestion()
  });

  const handleQuestionClick = () => {
    // add loading spinner
    setRedirecting(true);
    if (!data) {
      return toast.error('Failed to get the daily challenge. Please try again');
    }
    // track event
    posthog.capture('daily_challenge_click');

    // redirect to the daily challenge
    router.push(data.uid);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-end gap-4 w-full max-w-lg justify-center"
    >
      <div className="flex flex-col md:flex-row items-end gap-3 w-full">
        <InputWithLabel
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Email Address"
          wrapperclassname="w-full"
          className="w-full"
          inputClassName="w-full"
        />
        <Button
          variant="accent"
          disabled={isSubmitting}
          wrapperClassName="!w-full md:!w-fit"
          className="w-full font-onest !bg-gradient-to-r !from-accent !via-white/20 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors"
        >
          {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
        </Button>
      </div>
      <div className="h-9 w-full">
        <Button
          variant="secondary"
          fullWidth
          type="button"
          onClick={handleQuestionClick}
        >
          {!data || redirecting ? (
            <LoadingSpinner />
          ) : (
            <>
              Answer today's challenge
              <ChevronRight className="ml-2 size-3" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
