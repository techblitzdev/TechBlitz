import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import PricingCard from '@/components/marketing/pricing/pricing-card';
import { useUserServer } from '@/hooks/use-user-server';
import { getPlans } from '@/utils/constants/pricing';
import FrequencyToggle from '@/components/shared/payment/frequency-toggle';

async function updateFrequency(frequency: 'month' | 'year') {
  'use server';
  const cookieStore = cookies();
  cookieStore.set('billing_frequency', frequency);
  revalidatePath('/upgrade');
}

export default async function UpgradePage({
  gradientBackground = true,
}: {
  gradientBackground?: boolean;
}) {
  const user = await useUserServer();
  const cookieStore = cookies();
  const billingPeriod = (cookieStore.get('billing_frequency')?.value as 'month' | 'year') || 'year';

  const products = getPlans(user, true, billingPeriod).filter(
    (product) => product && product.id !== 'free'
  );

  return (
    <div className="relative pt-5">
      <div className="w-full flex flex-col container z-50 relative items-center justify-center text-center">
        <h1 className="text-gradient from-white to-white/75 text-3xl !font-onest tracking-tight py-1">
          Unlock a{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/55">
            personalized{' '}
          </span>{' '}
          learning experience
        </h1>

        <div className="flex flex-col items-center w-full mt-2">
          <p className="text-sm text-center max-w-xl self-center">
            Upgrade your account from just $0.17 a day - Cancel anytime.
          </p>
          <FrequencyToggle initialFrequency={billingPeriod} onFrequencyChange={updateFrequency} />
          <div className="w-full lg:w-3/4 flex flex-col lg:flex-row gap-10 justify-center mt-8 px-2 md:px-10">
            {products.map(
              (product) =>
                product && (
                  <PricingCard
                    key={product.id}
                    product={product}
                    compact={true}
                    paymentTrigger={true}
                    gradientBackground={gradientBackground}
                  />
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
