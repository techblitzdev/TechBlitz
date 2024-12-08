import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { StripeProduct } from '@/types/StripeProduct';
import { cn } from '@/utils/cn';
import { CheckIcon } from 'lucide-react';

export default function PricingCard(opts: { product: StripeProduct }) {
  const { product } = opts;

  const paymentLink = product?.metadata?.paymentLink;
  const mostPopular = product.metadata.mostPopular == 'true';
  const isFree = !product.default_price?.unit_amount;
  // if it is free, then link to the signup page
  const href = isFree ? '/signup' : paymentLink;

  return (
    <Card
      style={{
        background:
          'radial-gradient(128% 107% at 0% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)'
      }}
      className={cn(
        'col-span-3 lg:col-span-4 group-hover:scale-[1.03] duration-300 pb-3 bg-black-75 flex flex-col justify-between h-full gap-y-4',
        mostPopular ? 'border-accent' : 'border-black-50'
      )}
    >
      <CardHeader>
        <div className="flex flex-col gap-2 text-start">
          <h3 className="text-sm text-white font-satoshi flex gap-x-2">
            {product.name}
            {mostPopular && (
              <Badge className="font-onest !bg-gradient-to-r !from-accent !via-accent/60 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors">
                Most popular
              </Badge>
            )}
          </h3>
          <div className="flex flex-col gap-y-1">
            <span className="text-4xl font-semibold !leading-[1.1] text-gradient from-white to-white/75 font-onest">
              £
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
      <CardContent className="text-start pb-2 sm:pb-6 pt-3 sm:pt-6 flex flex-col gap-y-6 justify-between h-full">
        <div className="flex flex-col gap-y-3">
          {product?.features?.map((feature) => (
            <div
              key={product.id + feature.name}
              className="flex gap-x-2 items-center"
            >
              <div className="bg-accent p-0.5 rounded-full">
                <CheckIcon className="size-3 text-white" />
              </div>
              <span className="text-sm text-white">{feature.name}</span>
            </div>
          ))}
        </div>
        <Button
          fullWidth
          variant={mostPopular ? 'accent' : 'default'}
          href={href}
        >
          {isFree ? 'Sign up' : 'Get started'}
        </Button>
      </CardContent>
    </Card>
  );
}
