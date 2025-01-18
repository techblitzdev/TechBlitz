import { prisma } from '@/lib/prisma';
import { resend } from '@/lib/resend';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

// my user uid for testing this.
const TEST_USER_UID = '3a57d7e8-8b80-483b-93d0-70fe1f06b0c0';

export async function GET(request: NextRequest) {
  console.log(request);

  const user = await prisma.users.findUnique({
    where: {
      uid: TEST_USER_UID,
    },
  });

  if (!user) {
    return new Response('User not found', { status: 404 });
  }

  await resend.emails.send({
    from: 'team@techblitz.dev',
    to: user.email,
    subject: 'Daily Streak',
    html: '<p>Hello, world!</p>',
  });

  return new Response('Email sent', { status: 200 });
}
