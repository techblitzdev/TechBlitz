import { cancelSubscription } from '@/actions/stripe/stripe-cancel-subscription';
import CancelSubscriptionButton from '@/components/settings/cancel-subscription-button';
import { Button } from '@/components/ui/button';
import { useUserServer } from '@/hooks/useUserServer';

export default async function BillingPage() {
  const user = await useUserServer();
  if (!user || !user.uid) return;

  const handleCancelSubscription = async () => {
    try {
      await cancelSubscription({
        userUid: user.uid,
      });
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl">Billing</h1>

      <CancelSubscriptionButton user={user} />
    </div>
  );
}
