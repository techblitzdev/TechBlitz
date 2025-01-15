import { getPlans } from '@/utils/constants/pricing';
import PricingCard from './pricing-card';

export default function PricingCardBlock() {
  // grab the stripe products
  const products = getPlans(null);

  return (
    <section className="max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-10 self-center ">
      {products.map((product) => (
        <PricingCard key={product.id} product={product} />
      ))}
    </section>
  );
}
