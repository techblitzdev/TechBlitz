import Stripe from 'stripe';

export const stripe = new Stripe(
  'sk_test_51QCSYxCX23ptLp4LDRAVgbPzuOFS7s7ukSS7c2aql4kbKfCxkVNdWwYvS2BqENlbNWtBPnaD58FiPXGGiFC00Nsi00naFJwqlA',
  {
    apiVersion: '2024-09-30.acacia',
  }
);
