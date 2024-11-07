import { getStripeProducts } from '@/actions/stripe/stripe-products';
import { PricingCard } from '@/components/payment/payment-card';

export default async function UpgradePage() {
  // get the products
  const products = await getStripeProducts();

  return (
    <div className="relative bg-dot-white/[0.2]">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <div className="w-full h-svh flex flex-col py-12 container z-50 relative items-center justify-center">
        <h1 className="text-3xl lg:text-5xl text-center">
          Simple and affordable <br /> pricing plans
        </h1>

        <div className="flex flex-col w-full mt-10">
          <p className="font-satoshi text-center">
            Upgrade your account to unlock premium features, plans tailored to
            you.
          </p>
          <div className="flex gap-10 justify-center mt-6">
            {products?.map((product) => (
              <PricingCard
                key={product.id}
                product={product}
                isLoading={false}
                billingPeriod="month"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
