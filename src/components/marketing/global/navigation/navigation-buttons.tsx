'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/loading';
import { useUser } from '@/hooks/useUser';
import { ArrowRight } from 'lucide-react';
import GithubLogo from '@/components/ui/icons/github';

export default function NavigationButtons() {
  const { user, isLoading } = useUser();
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isLoggedIn = isDevelopment || Boolean(user?.email);

  if (isLoading && !isDevelopment) {
    return (
      <div className="flex items-center gap-x-2">
        <GithubStars />
        <Button
          disabled
          className="hidden lg:block font-onest !bg-gradient-to-r !from-accent !via-accent/70 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors"
        >
          <LoadingSpinner />
        </Button>
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-x-2">
        <GithubStars />
        <a
          href="/dashboard"
          className="px-4 py-2 rounded-md text-sm font-medium hidden lg:block font-onest !bg-gradient-to-r !from-accent !via-accent/70 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors"
        >
          Dashboard
        </a>
      </div>
    );
  }

  return (
    <div className="items-center gap-x-2 hidden lg:flex">
      <GithubStars hideText={true} />
      <Button href="/dashboard" variant="ghost" className="font-onest">
        Dashboard
      </Button>
      <Button
        href="/dashboard"
        variant="accent"
        className="font-onest !bg-gradient-to-r !from-accent !via-white/20 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors"
      >
        Get Started
        <ArrowRight className="ml-2 size-4" />
      </Button>
    </div>
  );
}

export function GithubStars(opts: { hideText?: boolean }) {
  const { hideText = false } = opts;

  return (
    <Button
      href="https://git.new/blitz"
      target="_blank"
      variant="ghost"
      className="relative group hover:text-gray-400 transition-all duration-200 font-onest px-0 lg:px-4"
    >
      <div className="flex items-center gap-x-2">
        <div className="size-4">
          <GithubLogo />
        </div>
        {!hideText && (
          <span className="font-medium hidden lg:block">Star us</span>
        )}
      </div>
    </Button>
  );
}
