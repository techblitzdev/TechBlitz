import AnimatedPricingFeatures from '@/components/shared/payment/animated-pricing-features';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// constants
import { Plan } from '@/utils/constants/pricing';

// utils
import { cn } from '@/lib/utils';
import NumberFlow from '@number-flow/react';

export default function PricingCard(opts: {
  product: Plan;
  compact?: boolean;
  paymentTrigger?: boolean;
  showSignup?: boolean;
  gradientBackground?: boolean;
}) {
  const { product, compact, paymentTrigger, showSignup, gradientBackground } = opts;

  if (!product) return null;

  const isFree = !product.price;

  return (
    <Card
      style={{
        background: gradientBackground
          ? 'radial-gradient(128% 107% at 0% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)'
          : 'transparent',
      }}
      className={cn(
        'flex-1 col-span-2 lg:col-span-1 group-hover:scale-[1.03] duration-300 pb-3 bg-black-75 flex flex-col justify-between h-full gap-y-4 border-black-50'
      )}
    >
      <CardHeader className="pb-0">
        <div className="flex flex-col text-start">
          <div className="flex w-full justify-between items-center">
            <h2 className="font-onest text-white">{product.name}</h2>
            {product.mostPopular && (
              <div className="bg-accent rounded-lg text-white text-xs px-2 py-1 font-semibold">
                Most popular
              </div>
            )}
            {/** 
             * 
            {product.chip && (
              <div className="bg-accent rounded-lg text-white text-xs px-2 py-1 font-semibold">
                {product.chip}
              </div>
            )}
                */}
          </div>
          <div className="flex flex-col gap-y-1 mb-2">
            <div className="flex gap-x-1 items-center mt-2">
              <div className="flex gap-x-1 items-center font-onest text-gradient from-white to-white/75">
                <span className="text-lg font-semibold">{product.currencySymbol}</span>
                <NumberFlow value={product.price} className="text-5xl font-onest text-white" />
              </div>
              <span className="text-sm font-inter mt-3 text-gray-300">{product.frequencyText}</span>
            </div>
            <p className="text-sm font-onest text-gray-300">{product.shortText}</p>
          </div>
        </div>
        <Separator className="bg-black-50" />
      </CardHeader>

      <CardContent className="text-start pb-2 sm:pb-2 pt-2 sm:pt-0 flex flex-col gap-y-3 justify-between h-full text-white">
        <AnimatedPricingFeatures
          features={compact ? product.compactFeatures : product.features}
          productId={product.id}
          isFree={isFree}
        />
        <Button
          fullWidth
          variant="secondary"
          href={
            showSignup
              ? '/signup'
              : paymentTrigger
                ? product.paymentLink?.production
                : isFree
                  ? '/signup'
                  : '/upgrade'
          }
        >
          {isFree ? 'Start for free' : 'Get Premium'}
        </Button>
      </CardContent>
    </Card>
  );
}
