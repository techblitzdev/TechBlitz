import PricingCard from './pricing-card';
import { getStripeProducts } from '@/actions/stripe/stripe-products';

export default async function PricingCardBlock() {
  // grab the stripe products
  const products = await getStripeProducts();

  return (
    <section className="max-w-5xl grid grid-cols-3 lg:grid-cols-12 gap-10 self-center">
      {products.map((product) => (
        <PricingCard
          key={product.id}
          product={product}
        />
      ))}
    </section>
  );
}
