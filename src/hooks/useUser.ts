import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';
import type { UserRecord } from '@/types/User';
import { getUserFromDb } from '@/actions/user/get-user';

export const useUser = () => {
  const supabase = createClient();

  const { data, isLoading, isError, error } = useQuery<
    UserRecord | null,
    Error
  >({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        console.log('Fetching user data');
        const { data: authData, error: authError } =
          await supabase.auth.getUser();

        if (authError) throw authError;
        if (!authData?.user?.id) return null;

        const userData = await getUserFromDb(authData.user.id);
        if (!userData) {
          console.error('No user data found');
          return null;
        }

        console.log('User data fetched:', userData);
        return userData;
      } catch (err) {
        console.error('Error fetching user:', err);
        throw err;
      }
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    user: data,
    isLoading,
    isError,
    error,
  };
};
