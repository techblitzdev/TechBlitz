'use client';
import { Button } from '@/components/ui/button';
import { cancelSubscription } from '@/actions/stripe/stripe-cancel-subscription';
import { useState, useTransition } from 'react';
import type { UserWithOutAnswers } from '@/types/User';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function CancelSubscriptionButton(opts: {
  user: UserWithOutAnswers;
}) {
  const router = useRouter();
  const { user } = opts;
  const { userLevel, uid: userUid } = user;

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleCancelSubscription = async (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      try {
        await cancelSubscription({ userUid });
        toast.success('Subscription cancelled successfully');
        // Redirect to the dashboard
        router.push('/dashboard?r=subscription-cancelled');
      } catch (error) {
        console.error('Failed to cancel subscription:', error);
        setError('Failed to cancel subscription. Please try again.');
      }
    });
  };

  return (
    <div>
      {userLevel !== 'FREE' && (
        <form action={handleCancelSubscription}>
          <Button
            type="submit"
            variant="destructive"
            className="mt-4"
            disabled={isPending}
          >
            {isPending ? 'Cancelling...' : 'Cancel subscription'}
          </Button>
        </form>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
