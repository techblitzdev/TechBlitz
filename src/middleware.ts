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
  '/reset-password',
  '/verify-email',
  '/verify-email/success',
];

// Exclude some paths from the middleware (e.g., API, public files, etc.)
export const config = {
  matcher: ['/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)'],
};

// Middleware function
export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;

  // Early return if on a non-auth path
  if (nonAuthPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Get the current user session
  const { user, response } = await updateSession(req);

  // If there's no user, redirect to the login page unless it's a non-auth path
  if (!user?.user?.id) {
    return NextResponse.redirect(
      new URL(`/login?r=${encodeURIComponent(pathname)}`, req.url)
    );
  }

  // Check for admin access if the user is navigating to the admin page
  if (pathname.startsWith('/admin')) {
    const response = await fetch(`${getBaseUrl()}/api/user/${user.user.id}`, {
      method: 'GET',
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
