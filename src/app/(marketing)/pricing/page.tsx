import CallToActionBlock from '@/components/marketing/global/call-to-action-block';
import { AnimatedBreak } from '@/components/marketing/pricing/animated-break';
import PricingCardBlock from '@/components/marketing/pricing/pricing-card-block';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing | techblitz',
  description: 'techblitz pricing plans',
  keywords: [
    'techblitz',
    'pricing',
    'plans',
    'features',
    'subscription',
    'affordable',
    'premium',
    'free',
    'most popular',
    'software',
    'development'
  ]
};

export default function PricingPage() {
  return (
    <div className="text-center min-h-screen container flex flex-col">
      <div className="flex flex-col gap-y-2 items-center py-16 md:pb-20 md:pt-32 xl:py-40">
        <div className="group w-fit relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Pricing
          </span>
        </div>
        <h1 className="text-3xl lg:text-5xl !font-onest !font-medium !leading-[1.1] text-gradient from-white to-white/75">
          Plans that don't <AnimatedBreak /> the bank
        </h1>
        <p className="text-gray-400">
          Start for free and unlock premium features with our affordable plans.
        </p>
        <div className="mt-10">
          <PricingCardBlock />
        </div>
      </div>
      <CallToActionBlock title="Master Coding in Weeks, Not Years" />
    </div>
  );
}
