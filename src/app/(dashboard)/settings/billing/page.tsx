import { getSubscriptionDetails } from '@/actions/stripe/stripe-get-subscription-details';
import { getUserInvoices } from '@/actions/stripe/stripe-get-user-invoices';
import Chip from '@/components/ui/chip';
import BillingHistoryTable from '@/components/settings/billing-history-table';
import CancelSubscriptionModal from '@/components/settings/cancel-subscription-modal';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useUserServer } from '@/hooks/useUserServer';

export default async function BillingPage() {
  const user = await useUserServer();
  if (!user || !user.uid) return;

  // get the stripe billing history
  const invoices = await getUserInvoices(user.uid);

  // get the next billng date
  const nextBillingDate = await getSubscriptionDetails(user.uid);
  if (!nextBillingDate) return;

  const nextBilling = new Date(
    nextBillingDate.current_period_end * 1000
  ).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="flex flex-col items-start">
      <div className="space-y-1 p-8">
        <h1 className="text-2xl">Plans and billing</h1>
        <p className="text-sm">Manage your plan and billing details.</p>
      </div>

      <Separator className="w-full bg-black-50" />

      <div className="p-8 space-y-5 font-ubuntu">
        <div className="flex flex-col gap-1 text-lg">
          <h6 className="text-lg">Your current plan</h6>
          <p className="text-sm flex items-center gap-x-1">
            You are currently on the{' '}
            <Chip
              color="accent"
              text={user.userLevel}
            />{' '}
            plan.
          </p>
        </div>
        {user.userLevel === 'FREE' ? (
          <div className="space-y-1.5">
            <p className="text-sm">
              You are on the free plan. Upgrade to a paid plan to unlock more
              features.
            </p>
            <Button variant="accent">Upgrade to paid plan</Button>
          </div>
        ) : (
          <div className="space-y-1">
            <h6 className="text-lg">Next billing date</h6>
            <p className="text-sm">
              Your next billing date is{' '}
              <span className="font-bold">{nextBilling}</span>
            </p>
          </div>
        )}
      </div>

      <div className="mx-8 mb-8 w-1/2 border border-black-50 rounded-xl overflow-hidden">
        <div className="space-y-1 p-4">
          <h6 className="text-lg">Billing history</h6>
          <p className="text-sm">
            View your past invoices and billing history.
          </p>
        </div>
        <BillingHistoryTable invoices={invoices} />
      </div>

      <div className="mx-8 mb-8">
        <CancelSubscriptionModal user={user} />
      </div>
    </div>
  );
}
