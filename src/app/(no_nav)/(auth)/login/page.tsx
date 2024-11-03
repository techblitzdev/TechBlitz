import LoginForm from '@/components/auth/login';

export default function SignupPage() {
  return (
    <div className="bg-black-100 p-8 rounded-xl space-y-4 text-center">
      <h1 className="font-bold text-3xl mb-2">Welcome back!</h1>
      <p className="text-gray-300 mb-8 text-sm font-satoshi text-wrap">
        Sign in to your account to continue.
      </p>
      <LoginForm />
    </div>
  );
}
