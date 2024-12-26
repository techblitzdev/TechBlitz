'use client';

import { motion } from 'framer-motion';
import { CheckIcon } from '@radix-ui/react-icons';

interface Feature {
  name: string;
}

interface AnimatedPricingFeaturesProps {
  features: Feature[];
  productId: string;
}

export default function AnimatedPricingFeatures({
  features,
  productId
}: AnimatedPricingFeaturesProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      className="flex flex-col gap-y-3 py-5"
    >
      {features.map((feature, index) => (
        <motion.div
          key={`${productId}-${feature.name}-${index}`}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          className="flex gap-x-2 items-center"
        >
          <div className="bg-accent p-0.5 rounded-full">
            <CheckIcon className="size-3" />
          </div>
          <span className="text-sm text-start">{feature.name}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
