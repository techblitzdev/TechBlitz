'use client';
import { PricingCard } from '@/components/payment/(testing)/payment-card';
import { useProducts } from '@/hooks/useProducts';

export default function SubscriptionTestPage() {
  const { data: products, isLoading } = useProducts();

  return (
    <div className="container py-12 text-white flex flex-col gap-y-4">
      <h1 className="text-xl md:text-3xl font-satoshi font-semibold">
        Subscription Test Page
      </h1>
      <h6>Products:</h6>
      <div className="flex gap-10">
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
