import { UserLevel } from '@/types/User';

interface PricingPlan {
  uid: string;
  name: string;
  value: UserLevel;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    uid: 'prod_RCUoaCsYoBPN4e',
    name: 'Free',
    value: 'FREE',
  },
  {
    uid: 'prod_RCUocTRqcoLtvH',
    name: 'Standard',
    value: 'STANDARD',
  },
  {
    uid: 'prod_RVbQaH3ydY4F3g',
    name: 'Premium',
    value: 'PREMIUM',
  },
];
