import Stripe from 'stripe';
// component imports
import { PaymentButton } from '../payment-card-button';
import { ReloadIcon, CheckIcon } from '@radix-ui/react-icons';

//type imports
import type { StripeProduct } from '@/types/StripeProduct';

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
        flex flex-col bg-electric-violet-900 p-8 border border-white/20
        w-1/2 justify-between relative rounded-xl min-h-full h-full
      "
    >
      <div className="flex flex-col justify-between h-full gap-y-8">
        <div className="flex flex-col gap-y-1 border-b border-black-50 pb-6">
          <div className="flex w-full justify-between items-center">
            <h2 className="text-xl font-semibold font-poppins">
              {product.name} id: {product.id}
            </h2>
          </div>
          <div className="flex gap-x-1 items-center">
            <div className="flex gap-x-1 items-center">
              £
              {isLoading ? (
                <ReloadIcon className="w-3 h-3 animate-spin" />
              ) : (
                <span className="text-4xl font-inter">
                  {product.default_price?.unit_amount
                    ? product.default_price.unit_amount / 100
                    : 0}
                </span>
              )}
            </div>
            <span className="text-xs mt-2">/ {billingPeriod}</span>
          </div>
          <p className="text-xs font-inter">{product.description}</p>
        </div>
        {/** Feature list */}
        <div className="flex flex-col gap-y-6 h-full justify-between">
          <div className="flex flex-col gap-y-3 font-poppins">
            {/* {product.features.map((feature) => (
              <div
                key={product.id + feature.name}
                className="flex gap-x-2 text-xs items-center"
              >
                <CheckIcon className="w-4 h-4 text-electric-violet-500" />
                <span>{feature.name}</span>
              </div>
            ))} */}
          </div>
          {/** payment trigger */}
          <PaymentButton key={product.id} product={product} />
        </div>
      </div>
    </div>
  );
}
