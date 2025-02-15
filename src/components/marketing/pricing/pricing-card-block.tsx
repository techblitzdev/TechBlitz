import { getPlans } from '@/utils/constants/pricing';
import PricingCard from './pricing-card';

export default function PricingCardBlock(opts: { frequency: 'month' | 'year' }) {
  // grab the stripe products
  const products = getPlans(null, false, opts.frequency);

  return (
    <section className="max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-10 self-center ">
      {products.map(
        (product) => product && <PricingCard key={product.id} product={product} showSignup={true} />
      )}
    </section>
  );
}
