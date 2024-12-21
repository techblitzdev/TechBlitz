import { useQuery } from '@tanstack/react-query';
import { getSubscription } from '@/actions/stripe/stripe-get-subscription';
import { useUser } from './useUser';

export const useSubscription = (userUid?: string) => {
  const uid = userUid;
  // get the current user
  const { user } = useUser();

  return useQuery({
    queryKey: ['get-subscription', user?.uid, uid],
    queryFn: () => {
      return getSubscription({
        userUid: user?.uid || uid || '',
      });
    },
  });
};
