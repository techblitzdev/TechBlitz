'use client';

import { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { InputWithLabel } from '@/components/ui/input-label';
import LoadingSpinner from '@/components/ui/loading';
import { ArrowDown, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { addToWaitlist } from '@/actions/waitlist/add';
import posthog from 'posthog-js';
import { useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getWaitlistCount } from '@/actions/waitlist/count';

export function WaitlistForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

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

      // Invalidate and refetch the waitlist count query
      await queryClient.invalidateQueries({ queryKey: ['waitlist-count'] });

      posthog.capture('waitlist_signup', { email });
    } catch (error) {
      setIsSubmitting(false);
      toast.error('Failed to add you to the waitlist. Please try again');
    }
  };

  const handleQuestionClick = () => {
    setRedirecting(true);
    posthog.capture('daily_challenge_click');
    router.push('daily-challenge');
  };

  const {
    data: waitlistCount,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['waitlist-count'],
    queryFn: () => getWaitlistCount(),
    enabled: true,
  });

  const count = useSpring(0, { duration: 2000 });
  const roundedCount = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (waitlistCount) {
      count.set(waitlistCount);
    }
  }, [waitlistCount, count]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-end gap-4 w-full max-w-lg justify-center"
    >
      <div className="flex flex-col gap-2 w-full items-center">
        <span className="text-xs text-gray-400 flex items-center gap-1">
          Join <motion.span>{roundedCount}</motion.span> users already on the
          waitlist!
          <ArrowDown className="size-3" />
        </span>
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
      </div>
      <div className="h-9 w-full">
        <Button
          variant="secondary"
          fullWidth
          type="button"
          onClick={handleQuestionClick}
        >
          {redirecting ? (
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
