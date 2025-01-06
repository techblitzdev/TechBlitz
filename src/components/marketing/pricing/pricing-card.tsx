import AnimatedPricingFeatures from '@/components/global/payment/animated-pricing-features';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/utils/cn';
import { Plan } from '@/utils/constants/pricing';

export default function PricingCard(opts: { product: Plan }) {
  const { product } = opts;

  const paymentLink = product?.paymentLink;
  const isFree = !product.price;

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
          <div className="flex gap-x-1 items-center lg:items-end mt-2">
            <div className="flex gap-x-1 items-center font-onest text-gradient from-white to-white/75">
              <span className="text-lg font-semibold">
                {product.currencySymbol}
              </span>
              <span className="text-5xl font-onest">{product.price}</span>
            </div>
            <span className="text-sm font-inter mb-1.5 text-gray-300">
              {product.frequencyText}
            </span>
          </div>
        </div>
        <Separator className="bg-black-50" />
      </CardHeader>

      <CardContent className="text-start pb-2 sm:pb-6 pt-3 sm:pt-0 flex flex-col gap-y-6 justify-between h-full text-white">
        <AnimatedPricingFeatures
          features={product.features}
          productId={product.id}
        />
        <Button fullWidth variant="secondary" href={'/signup'}>
          {isFree ? 'Sign up' : 'Get started'}
        </Button>
      </CardContent>
    </Card>
  );
}
