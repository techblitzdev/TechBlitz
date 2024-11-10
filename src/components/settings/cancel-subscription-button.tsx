'use client';
import { Button } from '@/components/ui/button';
import { cancelSubscription } from '@/actions/stripe/stripe-cancel-subscription';
import { useState } from 'react';
import type { UserWithOutAnswers } from '@/types/User';

export default function CancelSubscriptionButton(opts: {
  user: UserWithOutAnswers;
}) {
  const { user } = opts;
  const { userLevel, uid: userUid } = user;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCancelSubscription = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await cancelSubscription({ userUid });
      // You might want to refresh the page or update the user state here
      alert('Subscription cancelled successfully');
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      setError('Failed to cancel subscription. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {userLevel !== 'FREE' && (
        <form action={handleCancelSubscription}>
          <Button
            type="submit"
            variant="destructive"
            className="mt-4"
            disabled={isLoading}
          >
            {isLoading ? 'Cancelling...' : 'Cancel subscription'}
          </Button>
        </form>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
