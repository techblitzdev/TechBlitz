import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { updateSession } from "@/utils/supabase/middleware";


// See "Matching Paths" below to learn more
export const config = {
  matcher: '/admin/:path*',
}
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // get the current user that is trying to access the admin panel
  const { user: user } = await updateSession(request);

  // early exit if we do not find the user
  if (!user || !user.user?.id) {
    // redirect them to the signup page
    return NextResponse.redirect(new URL('/login?r=no-user', request.url));
  }

  // the user level is going to have to be checked on the admin page. 
  // we can just pass the user object to the page

  // run next here to prevent infinite loop
  return NextResponse.next();
}
