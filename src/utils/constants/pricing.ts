import { UserLevel } from '@/types/User';

interface PricingPlan {
  uid: string;
  name: string;
  value: UserLevel;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    uid: 'prod_RAybyZGAgEWBZG',
    name: 'Free',
    value: 'FREE',
  },
  {
    uid: 'prod_R4c14AjPuu66QA',
    name: 'Standard',
    value: 'STANDARD',
  },
  {
    uid: 'prod_R4c1F8yVFg0mb3',
    name: 'Premium',
    value: 'PREMIUM',
  },
];
