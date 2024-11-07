import Stripe from 'stripe';
// component imports
import { PaymentButton } from './payment-card-button';
import { CheckIcon, ReloadIcon } from '@radix-ui/react-icons';

//type imports
import type { StripeProduct } from '@/types/StripeProduct';
import { Separator } from '../ui/separator';

export function PricingCard(opts: {
  product: StripeProduct;
  isLoading: boolean;
  billingPeriod: Stripe.PriceListParams.Recurring.Interval;
}) {
  const { product, isLoading, billingPeriod } = opts;

  return (
    <div
      key={product.id}
      className="
        flex flex-col bg-black p-8 border border-black-50
        w-1/3 justify-between relative rounded-xl min-h-full h-full
      "
    >
      <div className="flex flex-col justify-between h-full gap-y-8">
        <div className="flex flex-col gap-y-1">
          <div className="flex w-full justify-between items-center">
            <h2 className="text-xl font-semibold font-poppins">
              {product.name}
            </h2>
            {product.metadata.mostPopular && (
              <div className="bg-accent rounded-full text-white text-xs px-2 py-1">
                {' '}
                Most popular
              </div>
            )}
          </div>
          <div className="flex gap-x-1 items-end">
            <div className="flex gap-x-1 items-center">
              £
              {isLoading ? (
                <ReloadIcon className="size-3 animate-spin" />
              ) : (
                <span className="text-4xl font-satoshi">
                  {product.default_price?.unit_amount
                    ? product.default_price.unit_amount / 100
                    : 0}
                </span>
              )}
            </div>
            <span className="text-xs font-satoshi">
              per {billingPeriod}, billed {billingPeriod}
            </span>
          </div>
          <p className="text-sm mt-2">{product.description}</p>
        </div>

        <Separator />
        {/** Feature list */}
        <div className="flex flex-col gap-y-6 h-full justify-between">
          <div className="flex flex-col gap-y-3 font-poppins">
            {product?.features?.map((feature) => (
              <div
                key={product.id + feature.name}
                className="flex gap-x-2 items-center"
              >
                <div className="bg-accent p-0.5 rounded-full">
                  <CheckIcon className="size-3" />
                </div>
                <span>{feature.name}</span>
              </div>
            ))}
          </div>
          {/** payment trigger */}
          <PaymentButton key={product.id} product={product} />
        </div>
      </div>
    </div>
  );
}
