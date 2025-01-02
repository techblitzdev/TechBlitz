import * as React from 'react';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { mockUser } from '@/lib/mock';

export async function updateSession(request: NextRequest) {
  // In development mode, return mock user
  if (process.env.NODE_ENV === 'development') {
    return {
      user: { user: mockUser },
      response: NextResponse.next({
        request: {
          headers: request.headers
        }
      })
    };
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers
    }
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If env variables are missing in production, throw error
  if (process.env.NODE_ENV === 'production' && (!supabaseUrl || !supabaseKey)) {
    throw new Error('Missing env variables for Supabase');
  }

  // If env variables are missing in other environments, return mock user
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase credentials not found. Using mock user.');
    return {
      user: { user: mockUser },
      response
    };
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value,
          ...options
        });
        response = NextResponse.next({
          request: {
            headers: request.headers
          }
        });
        response.cookies.set({
          name,
          value,
          ...options
        });
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value: '',
          ...options
        });
        response = NextResponse.next({
          request: {
            headers: request.headers
          }
        });
        response.cookies.set({
          name,
          value: '',
          ...options
        });
      }
    }
  });

  const { data: { user } } = await supabase.auth.getUser();

  return { user: { user }, response };
}
