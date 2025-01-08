import LoginForm from '@/components/auth/login';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <div
      className="border border-black-50 p-8 rounded-xl space-y-4 text-center"
      style={{
        background:
          'radial-gradient(128% 107% at 0% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)',
      }}
    >
      <h1 className="font-bold text-3xl mb-2">Welcome back!</h1>
      <p className="text-gray-300 mb-8 text-sm font-satoshi text-wrap">
        Sign in to your account to continue.
      </p>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
