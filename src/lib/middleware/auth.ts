import { updateSession } from "@/utils/supabase/middleware";
import { type NextRequest, NextResponse } from "next/server";

/**
 * This middleware will check if the user is authenticated
 * 
 * @param req The incoming request
 */
export default async function AuthMiddleware(
  req: NextRequest,
  path: string
) {
  const { headers } = req;

  // get the current session & user
  const { response: session, user: user } = await updateSession(req); 

  // if there is no user, and they are trying to access a page that requires auth
  // redirect them to the dashboard with a not-authenticated message
  // so on the /login route we can display a message to the user
  if (!user?.user?.id) {
    if (
      path !== '/login' && 
      path !== '/sign-up' && 
      path !== '/forgot-password' &&
      path !== '/reset-password' &&
      path !== '/verify-email' &&
      path !== '/welcome'
    ) {
      return NextResponse.redirect(new URL('/login?r=not-authenticated', req.url));
    }
  } else {
    // redirect the user to the dashboard if they are 
    //authenticated and trying to access the login page
    if (path === '/login') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // if the user is authenticated, and trying to access '/', make the dashboard the root page
    if (path === '/') {
      return NextResponse.rewrite(new URL('/test', req.url));
    }
  }
  // other wise, the user is authenticated, trying to access the root site (app.layowt.com), and is allowed to access the page
  return NextResponse.next()
}