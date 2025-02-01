import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'

import { createClient } from '@/utils/supabase/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  // Extract parameters from the query string
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/login'

  // Prepare the redirect URL
  const redirectTo = new URL(request.nextUrl.origin)
  redirectTo.pathname = next

  // Remove sensitive parameters from the redirect URL
  redirectTo.searchParams.delete('token_hash')
  redirectTo.searchParams.delete('type')

  if (token_hash && type) {
    const supabase = await createClient()

    // Verify the OTP
    const { error } = await supabase.auth.verifyOtp({ type, token_hash })
    if (!error) {
      const { data: userSession } = await supabase.auth.getUser()

      if (userSession?.user) {
        const { id, email } = userSession.user

        // Ensure the user exists in the database
        const existingUser = await prisma.users.findUnique({
          where: { uid: id },
        })
        if (!existingUser) {
          await prisma.users.create({
            data: {
              uid: id,
              email: email ?? '',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          })
        }

        // Add the onboarding query parameter to the URL
        redirectTo.searchParams.set('onboarding', 'true')

        // Redirect to the next page
        return NextResponse.redirect(redirectTo.toString())
      }
    } else {
      console.error('Error verifying OTP:', error.message)
    }
  }

  // Redirect to the error page if verification fails
  redirectTo.pathname = '/error'
  return NextResponse.redirect(redirectTo.toString())
}
