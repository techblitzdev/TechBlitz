import { CardContent, CardHeader } from '@/components/ui/card';
import { motion } from 'framer-motion';

import PricingCard from '@/components/marketing/pricing/pricing-card';
import { getPlans } from '@/utils/constants/pricing';
import { useOnboardingContext } from '@/contexts/onboarding-context';
import FrequencyTabs from '@/components/shared/payment/frequency-toggle';
import { useState } from 'react';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function OnboardingPricing() {
  const { user } = useOnboardingContext();

  const [billingPeriod, setBillingPeriod] = useState<'month' | 'year'>('year');

  const products = getPlans(user, true, billingPeriod);

  return (
    <>
      <CardHeader>
        <div className="flex flex-col items-center gap-y-4 mb-3">
          <motion.h1
            className="text-4xl flex flex-col items-center font-medium bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent text-center"
            variants={itemVariants}
          >
            Supercharge your coding journey
          </motion.h1>
          <motion.p
            className="text-center text-gray-400 max-w-2xl text-sm font-onest"
            variants={itemVariants}
          >
            {user?.userCustomCoupon &&
            user?.userCustomCouponExpiresAt &&
            user?.userCustomCouponExpiresAt > new Date() ? (
              <>
                Receive <span className="font-bold">60% off</span> your first three months with code{' '}
                <span className="font-bold">{user?.userCustomCoupon}</span>. <br />
                Offer ends {user?.userCustomCouponExpiresAt?.toLocaleDateString()}.
              </>
            ) : (
              "Join developers worldwide learning to code through TechBlitz's personalized coding platform."
            )}
          </motion.p>
        </div>
        <FrequencyTabs initialFrequency={billingPeriod} onFrequencyChange={setBillingPeriod} />
      </CardHeader>
      <CardContent className="w-full lg:w-2/3 mx-auto flex flex-col lg:flex-row gap-10 justify-center mt-4 mb-5 px-2 md:px-10">
        <div className="flex flex-col lg:flex-row gap-10 justify-center items-stretch w-full">
          {products.map(
            (product) =>
              product && (
                <div key={product.id} className="flex-1 flex">
                  <PricingCard
                    key={product.id}
                    product={product}
                    compact={true}
                    paymentTrigger={true}
                  />
                </div>
              )
          )}
        </div>
      </CardContent>
    </>
  );
}
