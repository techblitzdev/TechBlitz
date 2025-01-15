import { CardContent, CardHeader } from '@/components/ui/card';
import { motion } from 'framer-motion';

import PricingCard from '@/components/marketing/pricing/pricing-card';
import { getPlans } from '@/utils/constants/pricing';
import { useOnboardingContext } from './onboarding-context';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function OnboardingPricing() {
  const { user } = useOnboardingContext();

  const products = getPlans(user);

  const compactProducts = products.filter((product) => product.id !== 'free');

  return (
    <>
      <CardHeader>
        <div className="flex flex-col items-center">
          <motion.h1
            className="text-2xl flex flex-col items-center font-medium bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent text-center"
            variants={itemVariants}
          >
            Want to get more out of TechBlitz?
          </motion.h1>
          <motion.p
            className="text-center text-gray-400 max-w-3xl"
            variants={itemVariants}
          >
            Upgrade to a paid plan to unlock premium features, gain access to
            exclusive content, and be the first to experience new updates.
          </motion.p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col lg:flex-row gap-10 justify-center mt-4 md:mt-6 mb-5 px-2 md:px-10">
        <div className="flex flex-col lg:flex-row gap-10 justify-center items-stretch w-full">
          {compactProducts.map((product) => (
            <div key={product.id} className="flex-1 flex">
              <PricingCard
                key={product.id}
                product={product}
                compact={true}
                paymentTrigger={true}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </>
  );
}
