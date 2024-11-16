import { getUserInvoices } from '@/actions/stripe/stripe-get-user-invoices';
import BillingHistoryTable from '@/components/settings/billing-history-table';
import CancelSubscriptionModal from '@/components/settings/cancel-subscription-modal';
import { useUserServer } from '@/hooks/useUserServer';

export default async function BillingPage() {
  const user = await useUserServer();
  if (!user || !user.uid) return;

  // get the stripe billing history
  const invoices = await getUserInvoices(user.uid);

  return (
    <div className="flex flex-col items-start gap-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl">Plans and billing</h1>
        <p className="text-sm">Manage your plan and billing details.</p>
      </div>

      <div className="w-1/2 border border-black-50 rounded-xl overflow-hidden">
        <div className="space-y-1 p-4">
          <h2 className="text-lg">Billing history</h2>
          <p className="text-sm">
            View your past invoices and billing history.
          </p>
        </div>
        <BillingHistoryTable invoices={invoices} />
      </div>

      <CancelSubscriptionModal user={user} />
    </div>
  );
}
