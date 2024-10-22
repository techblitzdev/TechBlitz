import { BaseRecord } from './BaseRecord';

// Types for subscription-related data
export interface Subscription extends BaseRecord {
  userUid: string;
  startDate: Date;
  endDate: Date;
  active: boolean;
  planId: string;
  planTrial: boolean;
  planTrialDays: number | null;
}

// Type for creating a new subscription
export type CreateSubscriptionInput = Omit<
  Subscription,
  'uid' | 'createdAt' | 'updatedAt' | 'userUid'
>;

// Type for updating a subscription
export type UpdateSubscriptionInput = Partial<
  Omit<Subscription, 'uid' | 'createdAt' | 'updatedAt' | 'userUid'>
>;

// Type for subscription status
export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
  TRIAL = 'TRIAL',
}

// Type for subscription plan details
export type SubscriptionPlan = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  trialDays?: number;
};