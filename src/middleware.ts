import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';
import { getBaseUrl } from './utils';
import { User } from './types/User';

// Define the route groups and their auth requirements
const routeConfig = {
  // Marketing site routes (no auth required)
  marketing: {
    patterns: ['/', '/about', '/pricing', '/contact'],
    requiresAuth: false,
  },
  // Auth-related routes (no auth required)
  auth: {
    patterns: [
      '/login',
      '/signup',
      '/forgot-password',
      '/update-password',
      '/verify-email',
    ],
    requiresAuth: false,
  },
  // Dashboard routes (auth required)
  dashboard: {
    patterns: ['/dashboard'],
    requiresAuth: true,
  },
  // Admin routes (auth + admin role required)
  admin: {
    patterns: ['/admin'],
    requiresAuth: true,
    requiresAdmin: true,
  },
};

// Matcher configuration
export const config = {
  matcher: ['/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)'],
};

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;
  const referer = req.headers.get('referer');

  // Helper function to check if path matches any pattern
  const getRouteGroup = (path: string) => {
    for (const [group, config] of Object.entries(routeConfig)) {
      if (
        config.patterns.some((pattern) => {
          if (pattern.endsWith('/*')) {
            // For wildcard patterns, check if the path starts with the pattern prefix
            const prefix = pattern.slice(0, -2);
            return path === prefix || path.startsWith(prefix + '/');
          }
          // For exact patterns, check for exact match
          return path === pattern;
        })
      ) {
        return { group, config };
      }
    }
    return null;
  };

  // Handle legacy redirect
  if (pathname === '/sign-up') {
    return NextResponse.redirect(new URL('/signup', req.url));
  }

  if (pathname === '/homepage' || pathname === '/home') {
    return NextResponse.rewrite(new URL('/', req.url));
  }

  // Get route group for current path
  const route = getRouteGroup(pathname);

  // If path isn't in any group, treat it as a marketing page
  if (!route) {
    return NextResponse.next();
  }

  // Get current user session
  const { user } = await updateSession(req);
  const isAuthenticated = !!user?.user?.id;

  // Handle different route types
  if (route.config.requiresAuth && !isAuthenticated) {
    // Redirect to login if auth is required but user isn't authenticated
    return NextResponse.redirect(
      new URL(`/login?r=${encodeURIComponent(pathname)}`, req.url)
    );
  }

  // Special handling for admin routes
  if (route.group === 'admin' && isAuthenticated) {
    const response = await fetch(`${getBaseUrl()}/api/user/${user?.user?.id}`, {
      method: 'GET',
    });
    const userData: User = await response.json();

    if (userData.userLevel !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  // Only redirect to dashboard if user directly accesses root URL without referer
  if (pathname === '/' && isAuthenticated && !referer) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}
