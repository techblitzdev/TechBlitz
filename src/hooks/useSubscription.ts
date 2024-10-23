'use client';
import { useQuery } from '@tanstack/react-query';
import { getSubscription } from '@/actions/stripe/stripe-get-subscription';
import { useUser } from './useUser';

export const useSubscription = () => {
  // get the current user
  const { user } = useUser();

  return useQuery({
    queryKey: ['get-subscription', user?.uid],
    queryFn: () => {
      return getSubscription({
        userUid: user?.uid || '',
      });
    },
  });
};
