'use client';
import { PricingCard } from '@/components/payment/payment-card';
import LoadingSpinner from '@/components/ui/loading';
import { useProducts } from '@/hooks/useProducts';

export default function SubscriptionTestPage() {
  // get the products
  const { data: products, isLoading } = useProducts();

  return (
    <div className="container py-12 text-white flex flex-col gap-y-4 items-center">
      <h1 className="text-xl md:text-3xl font-satoshi font-semibold">
        Subscription Test Page
      </h1>
      <h6>Products:</h6>
      {isLoading && <LoadingSpinner />}
      <div className="flex gap-10 justify-center max-w-2xl">
        {products?.map((product) => (
          <PricingCard
            key={product.id}
            product={product}
            isLoading={isLoading}
            billingPeriod="month"
          />
        ))}
      </div>
    </div>
  );
}
