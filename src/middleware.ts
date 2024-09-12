import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { updateSession } from "@/utils/supabase/middleware";


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
 
// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const searchParams = req.nextUrl.searchParams.toString()
  const path = `${url.pathname}${
    searchParams.toString().length > 0 ? `?${searchParams.toString()}` : ''
  }`

  console.log({
    path
  })

  const nonAuthPaths = [
    '/login',
    '/signup',
    '/forgot-password',
    '/reset-password',
    '/verify-email',
    '/verify-email/success'
  ]

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

  // the user level is going to have to be checked on the admin page. 
  // we can just pass the user object to the page

  // run next here to prevent infinite loop
  return NextResponse.next();
}
