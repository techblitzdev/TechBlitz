import * as React from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { createMockSupabaseClient } from './mockClient';

export const createClient = () => {
  if (process.env.NODE_ENV === 'development') {
    return createMockSupabaseClient();
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase credentials not found. Using mock client.');
    return createMockSupabaseClient();
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
};
