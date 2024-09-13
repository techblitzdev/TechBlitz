import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { updateSession } from "@/utils/supabase/middleware";
import { getBaseUrl } from './utils';
import { User } from './types/User';


// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

const nonAuthPaths = [
    '/login',
    '/signup',
    '/forgot-password',
    '/reset-password',
    '/verify-email',
    '/verify-email/success'
  ]
 
// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const searchParams = req.nextUrl.searchParams.toString()
  const path = `${url.pathname}${
    searchParams.toString().length > 0 ? `?${searchParams.toString()}` : ''
  }`

  // get the current user that is trying to access the admin panel
  const { user: user } = await updateSession(req);

  // early exit if we do not find the user
  if (
    !user ||
    !user.user?.id &&
    !nonAuthPaths.includes(path)
  ) {
    // redirect them to the signup page
    return NextResponse.redirect(new URL('/login?r=no-user', req.url));
  }

  // now check if the user is trying to access the admin page is the admin
  if (
    path.includes('/admin') &&
    user.user
  ) {  
    // get the user from the db by hitting the 
    const response = await fetch(`${getBaseUrl()}/api/user/${user?.user.id}`, {
      method: 'GET'
    })
    const userData: User = await response.json();

    console.log(userData)

    // now check the userLevel
    if (!userData.userLevel || userData.userLevel !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }
}
