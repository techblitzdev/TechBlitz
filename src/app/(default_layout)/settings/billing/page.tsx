import CancelSubscriptionButton from '@/components/settings/cancel-subscription-button';
import CancelSubscriptionModal from '@/components/settings/cancel-subscription-modal';
import { useUserServer } from '@/hooks/useUserServer';

export default async function BillingPage() {
  const user = await useUserServer();
  if (!user || !user.uid) return;

  return (
    <div>
      <h1 className="text-2xl">Billing</h1>

      <CancelSubscriptionModal user={user} />
    </div>
  );
}
