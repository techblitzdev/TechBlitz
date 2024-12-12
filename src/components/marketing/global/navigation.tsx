import Link from 'next/link';
import Logo from '../../ui/logo';
import { Button } from '../../ui/button';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { ArrowRight } from 'lucide-react';

import { NavigationMenuItems } from './navigation-items';

export default function MarketingNavigation() {
  return (
    <div className="fixed w-full py-5 z-50 bg-[#000000]">
      <div className="container flex items-center justify-between">
        <Link
          href="/"
          aria-label="Go back to dashboard"
        >
          <Logo />
        </Link>
        {process.env.NEXT_PUBLIC_ENV === 'development' && (
          <div className="absolute left-1/2 transform -translate-x-1/2 py-2 px-4 hidden md:block">
            <NavigationMenuItems />
          </div>
        )}
        <div className="items-center gap-x-2 hidden md:flex">
          <Button
            href="/login"
            variant="ghost"
            className="font-onest"
          >
            Login
          </Button>
          {process.env.NEXT_PUBLIC_ENV === 'development' ? (
            <Button
              href="signup"
              variant="accent"
              className="font-onest !bg-gradient-to-r !from-accent !via-white/20 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors"
            >
              Get Started
              <ArrowRight className="ml-2 size-4" />
            </Button>
          ) : (
            <Button
              variant="accent"
              href="#waitlist-form"
              className="font-onest !bg-gradient-to-r !from-accent !via-white/20 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors"
            >
              Join the Waitlist
              <ArrowRight className="ml-2 size-4" />
            </Button>
          )}
        </div>
        {process.env.NEXT_PUBLIC_ENV === 'development' ? (
          <HamburgerMenuIcon className="size-5 block md:hidden" />
        ) : (
          <div className="flex md:hidden">
            <Button
              variant="accent"
              href="#waitlist-form"
              className="text-xs sm:text-sm font-onest !bg-gradient-to-r !from-accent !via-white/20 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors"
            >
              Join the Waitlist
              <ArrowRight className="ml-1 size-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
