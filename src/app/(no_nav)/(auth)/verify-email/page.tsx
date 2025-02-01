'use client';
import { Button } from '@/components/ui/button';

export default function VerifyEmailPage() {
  return (
    <div
      className="border border-black-50 p-8 rounded-xl space-y-4 text-center"
      style={{
        background: 'radial-gradient(128% 107% at 0% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)',
      }}
    >
      <h1 className="font-bold text-3xl mb-2">Check your email</h1>
      <p className="text-gray-300 mb-8 text-sm font-satoshi text-wrap">
        We&apos;ve sent you a verification link to your email address. <br />
        Please click the link to verify your account.
      </p>

      <div className="flex flex-col gap-4">
        Didn&apos;t receive the email? <Button href="/signup">Try signing up again</Button>
      </div>
    </div>
  );
}
