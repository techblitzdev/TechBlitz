import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data.user) {
      // get the users authentication record

      // Get profile picture from user metadata
      const profilePicture =
        data.user?.user_metadata?.picture || data.user?.user_metadata?.avatar_url;
      let displayName = data.user?.user_metadata?.full_name;

      // check if this name is already taken
      const existingDisplayName = await prisma.users.findFirst({
        where: {
          username: displayName,
        },
      });

      // set to empty - the user will need to change it
      if (existingDisplayName) {
        displayName = '';
      }

      // First try to find user by uid
      let existingUser = await prisma.users.findUnique({
        where: {
          uid: data.user.id,
        },
      });

      // If not found by uid, try to find by email
      if (!existingUser && data.user.email) {
        existingUser = await prisma.users.findUnique({
          where: {
            email: data.user.email,
          },
        });

        // If found by email but uid is different, update the uid
        if (existingUser) {
          existingUser = await prisma.users.update({
            where: {
              email: data.user.email,
            },
            data: {
              uid: data.user.id,
              updatedAt: new Date(),
            },
          });
        }
      }

      // If user doesn't exist at all, create new user
      if (!existingUser) {
        await prisma.users.create({
          data: {
            uid: data.user.id,
            email: data.user.email || '',
            // only add the profile picture on first login
            userProfilePicture: profilePicture || '',
            userLevel: 'FREE',
            username: displayName,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
      }

      const forwardedHost = request.headers.get('x-forwarded-host'); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development';
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
