import { mockUser } from '@/lib/mock';

type MockSupabaseClient = {
  auth: {
    getUser: () => Promise<{ data: { user: typeof mockUser } | null; error: null }>;
    signOut: () => Promise<{ error: null }>;
    onAuthStateChange: (callback: (event: string, session: any) => void) => { data: { subscription: { unsubscribe: () => void } } };
  };
  from: (table: string) => {
    select: () => {
      eq: (field: string, value: any) => Promise<any>;
    };
    insert: (data: any) => Promise<any>;
    update: (data: any) => Promise<any>;
    delete: () => Promise<any>;
  };
};

export const createMockSupabaseClient = (): MockSupabaseClient => ({
  auth: {
    getUser: async () => ({ data: { user: mockUser }, error: null }),
    signOut: async () => ({ error: null }),
    onAuthStateChange: (callback) => ({
      data: {
        subscription: {
          unsubscribe: () => {}
        }
      }
    })
  },
  from: (table: string) => ({
    select: () => ({
      eq: async (field: string, value: any) => ({ data: [], error: null })
    }),
    insert: async (data: any) => ({ data: { id: 'mock-id', ...data }, error: null }),
    update: async (data: any) => ({ data, error: null }),
    delete: async () => ({ data: null, error: null })
  })
});
