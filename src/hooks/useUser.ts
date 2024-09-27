import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

export const useUser = () => {
  const supabase = createClient();

  return useQuery<{ user: User | null }, Error>({
    queryKey: ['user'],
    queryFn: async () => {
      console.log('Fetching user data');
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      console.log('User data fetched:', data);
      return data;
    },
  });
};
