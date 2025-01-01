import AnimatedPricingFeatures from '@/components/global/payment/animated-pricing-features';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { StripeProduct } from '@/types/StripeProduct';
import { cn } from '@/utils/cn';

export default function PricingCard(opts: { product: StripeProduct }) {
  const { product } = opts;

  const isProd = process.env.NEXT_PUBLIC_ENV === 'production';
  const paymentLink = product?.metadata?.paymentLink;
  const mostPopular = product.metadata.mostPopular == 'true';
  const isFree = !product.default_price?.unit_amount;
  // if we are on prod, do not show the payment link
  // if it is free, then link to the signup page
  const href = isProd ? '#' : paymentLink || '#';

  return (
    <Card
      style={{
        background:
          'radial-gradient(128% 107% at 0% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)',
      }}
      className={cn(
        'flex-1 col-span-2 lg:col-span-1 group-hover:scale-[1.03] duration-300 pb-3 bg-black-75 flex flex-col justify-between h-full gap-y-4 border-black-50'
      )}
    >
      <CardHeader className="pb-0">
        <div className="flex flex-col gap-2 text-start">
          <div className="text-sm text-white font-onest flex gap-x-2">
            <p>{product.name}</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <span className="text-4xl font-semibold !leading-[1.1] text-gradient from-white to-white/75 font-onest">
              $
              {product.default_price?.unit_amount
                ? product.default_price?.unit_amount / 100
                : 0}
            </span>
            <p className="text-gray-400 text-xs font-satoshi">
              {product.default_price?.unit_amount
                ? 'per month, billed monthly'
                : 'Free, forever'}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="text-start pb-2 sm:pb-6 pt-3 sm:pt-0 flex flex-col gap-y-6 justify-between h-full text-white">
        <AnimatedPricingFeatures
          features={product.features}
          productId={product.id}
        />
        <Button
          fullWidth
          variant={mostPopular ? 'secondary' : 'default'}
          href={href}
          disabled={isProd}
        >
          {isFree ? 'Sign up' : 'Get started'} {isProd ? '(soon)' : ''}
        </Button>
      </CardContent>
    </Card>
  );
}
