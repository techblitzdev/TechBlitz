'use client';

import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/loading';
import { useUser } from '@/hooks/useUser';
import { ArrowRight } from 'lucide-react';

export default function NavigationButtons() {
  const { user, isLoading } = useUser();
  const isDevelopment = process.env.NEXT_PUBLIC_ENV === 'development';
  const isLoggedIn = Boolean(user?.email);

  if (isLoading) {
    return (
      <Button
        disabled
        className="hidden lg:block font-onest !bg-gradient-to-r !from-accent !via-accent/70 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors"
      >
        <LoadingSpinner />
      </Button>
    );
  }

  if (isLoggedIn) {
    return (
      <Button
        href="/dashboard"
        className="hidden lg:block font-onest !bg-gradient-to-r !from-accent !via-accent/70 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors"
      >
        Dashboard
      </Button>
    );
  }

  return (
    <div className="items-center gap-x-2 hidden lg:flex">
      <Button href="/login" variant="ghost" className="font-onest">
        Login
      </Button>
      <Button
        href={isDevelopment ? '/signup' : '#waitlist-form'}
        variant="accent"
        className="font-onest !bg-gradient-to-r !from-accent !via-white/20 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors"
      >
        {isDevelopment ? 'Get Started' : 'Join the Waitlist'}
        <ArrowRight className="ml-2 size-4" />
      </Button>
    </div>
  );
}
