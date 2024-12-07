import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';
import { getBaseUrl } from './utils';
import { User } from './types/User';

// Define the paths where authentication is not required
const nonAuthPaths = [
  '/login',
  '/signup',
  '/forgot-password',
  '/update-password',
  '/verify-email',
  '/verify-email/success',
  '/'
];

// Exclude some paths from the middleware (e.g., API, public files, etc.)
export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)'
  ]
};

// Middleware function
export async function middleware(req: NextRequest) {
  console.log('running middleware');
  const url = req.nextUrl;
  const pathname = url.pathname;

  // redirect sign-up to signup
  if (pathname === '/sign-up') {
    return NextResponse.redirect(new URL('/signup', req.url));
  }

  console.log('pathname', pathname);

  // Early return if on a non-auth path
  if (nonAuthPaths.some((path) => pathname === path)) {
    return NextResponse.next();
  }

  // Get the current user session
  const { user } = await updateSession(req);

  console.log({
    user
  });

  // If there's no user, redirect to the login page
  if (!user?.user?.id) {
    return NextResponse.redirect(
      new URL(`/login?r=${encodeURIComponent(pathname)}`, req.url)
    );
  }

  // Check for admin access if the user is navigating to the admin page
  if (pathname.startsWith('/admin')) {
    const response = await fetch(`${getBaseUrl()}/api/user/${user.user.id}`, {
      method: 'GET'
    });

    const userData: User = await response.json();

    // If the user is not an admin, redirect to the dashboard
    if (userData.userLevel !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  // check if the user has gone to '/' and is authenticated, redirect to dashboard
  if (pathname === '/' && user?.user?.id) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Proceed as normal if the user is authenticated and authorized
  return NextResponse.next();
}
