import { useQuery } from '@tanstack/react-query';
import { getSubscription } from '@/actions/stripe/stripe-get-subscription';
import { useUser } from './useUser';

export const useSubscription = (userUid?: string) => {
  let uid = userUid;
  // get the current user
  const { user } = useUser();

  console.log('user', user);
  console.log('uid', uid);

  return useQuery({
    queryKey: ['get-subscription', user?.uid, uid],
    queryFn: () => {
      return getSubscription({
        userUid: user?.uid || uid || '',
      });
    },
  });
};
