import { getPlans } from '@/utils/constants/pricing';
import PricingCard from './pricing-card';

export default async function PricingCardBlock() {
  // grab the stripe products
  const products = await getPlans(null);

  return (
    <section className="max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 self-center ">
      {products.map((product) => (
        <PricingCard key={product.id} product={product} />
      ))}
    </section>
  );
}
