'use client';
import { useQuery } from '@tanstack/react-query';
import { getStripeProducts } from '@/actions/stripe/stripe-products';

export const useProducts = () => {
  return useQuery({
    queryKey: ['get-products'],
    queryFn: () => {
      return getStripeProducts();
    },
  });
};
