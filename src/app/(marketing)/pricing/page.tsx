import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing | techblitz',
  description: 'techblitz pricing plans'
};

export default function PricingPage() {
  return (
    <div className="min-h-screen container py-16 md:pb-20 md:pt-32 xl:py-40">
      <h1 className="text-3xl lg:text-5xl !font-onest !font-medium !leading-[1.1] text-gradient from-white to-white/75">
        Prices that don't break the bank
      </h1>
      <p className="text-gray-400">
        Sign up for free, upgrade for our latest and premium features.
      </p>
    </div>
  );
}
