'use client';

import { Stripe } from 'stripe';
import { motion } from 'framer-motion';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import AnimatedPricingFeatures from './animated-pricing-features';
import NumberFlow from '@number-flow/react';

// type imports
import type { UserRecord } from '@/types/User';
import { Plan } from '@/utils/constants/pricing';
import { cn } from '@/lib/utils';

export function PricingCard(opts: {
  user: UserRecord | null;
  product: Plan;
  isLoading: boolean;
  billingPeriod: Stripe.PriceListParams.Recurring.Interval;
}) {
  const { product, isLoading } = opts;

  if (!product) return null;

  // get the payment link depending on if this is local env or production
  const paymentLink = !product.price
    ? '/sign-up'
    : process.env.NODE_ENV === 'development'
      ? typeof product.cta === 'object' && typeof product.cta.href === 'object'
        ? product.cta.href.local
        : product.cta.href
      : typeof product.cta.href === 'object'
        ? product.cta.href.production
        : product.cta.href;

  return (
    <motion.div
      key={product.id}
      className="
        flex flex-col p-3 pt-5 md:p-8 border border-black-50
        w-full lg:w-1/3 justify-between relative rounded-xl md:min-h-full h-full
        transition-all duration-300 ease-in-out
      "
      whileHover={{ scale: 1.02 }}
      style={{
        background:
          'radial-gradient(128% 107% at 0% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)',
      }}
    >
      <div className="flex flex-col justify-between h-full gap-y-4">
        <div className="flex flex-col gap-y-1">
          <div className="flex w-full justify-between items-center">
            <h2 className="font-onest text-white">{product.name}</h2>
            {product.mostPopular && (
              <div className="bg-accent rounded-lg text-white text-xs px-2 py-1 font-semibold">
                Most popular
              </div>
            )}
          </div>
          <div className="flex flex-col gap-y-1 mb-2">
            <div className="flex gap-x-1 items-center mt-2">
              <div className="flex gap-x-1 items-center font-onest text-gradient from-white to-white/75">
                <span className="text-lg font-semibold">
                  {product.currencySymbol}
                </span>
                {isLoading ? (
                  <ReloadIcon className="size-5 animate-spin" />
                ) : (
                  <NumberFlow
                    className="text-5xl font-onest text-white"
                    value={Number(product.price)}
                  />
                )}
              </div>
              <span className="text-sm font-inter mt-3 text-gray-300">
                {product.frequencyText}
              </span>
            </div>
            <p className="text-sm font-onest text-gray-300 text-start">
              {product.shortText}
            </p>
          </div>
        </div>

        <Separator className="bg-black-50" />

        {/** Feature list */}
        <div className="flex flex-col gap-y-6 h-full justify-between">
          <AnimatedPricingFeatures
            features={product.features || []}
            productId={product.id}
            loading={isLoading}
          />

          {/** payment trigger */}
          <Button
            href={
              typeof paymentLink === 'string'
                ? paymentLink
                : paymentLink.production
            }
            className={cn(
              'w-full text-lg font-semibold py-6',
              product.disabled && 'opacity-50 cursor-not-allowed'
            )}
            variant="secondary"
          >
            {isLoading ? (
              <ReloadIcon className="size-5 animate-spin" />
            ) : (
              <div className="font-satoshi">
                {!product.price ? 'Sign up' : product.cta.text}
              </div>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
