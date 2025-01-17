import { PricingCard } from '@/components/global/payment/payment-card';
import Logo from '@/components/ui/logo';
import { getPlans } from '@/utils/constants/pricing';
import { X } from 'lucide-react';

import Link from 'next/link';

export default async function Loading() {
  const products = getPlans(null);

  return (
    <div className="relative">
      <Link
        href="/dashboard"
        className="absolute top-8 left-8 z-50"
        aria-label="Go back to dashboard"
      >
        <Logo />
      </Link>
      <Link
        href="/dashboard"
        className="font-semibold top-5 right-5 absolute font-satoshi text-2xl z-[10000] hover:text-white/80 duration-300"
      >
        <X className="size-5" />
      </Link>

      <div className="w-full lg:h-svh flex flex-col pt-32 md:py-8 container z-50 relative items-center justify-center text-center">
        <h1 className="text-gradient from-white to-white/75 text-3xl lg:text-5xl !font-onest tracking-tight py-1">
          Simple and{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/55">
            affordable{' '}
          </span>
          <br /> pricing plans
        </h1>

        <div className="flex flex-col w-full mt-6">
          <p className="text-center max-w-xl self-center">
            Upgrade your account to unlock premium features, gain access to
            exclusive content, and be the first to experience new updates.
          </p>
          <div className="flex flex-col lg:flex-row gap-10 justify-center mt-8 md:mt-16 px-2 md:px-10">
            {products?.map(
              (product) =>
                product && (
                  <PricingCard
                    user={null}
                    key={product.id}
                    product={product}
                    isLoading={false}
                    billingPeriod="month"
                  />
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
