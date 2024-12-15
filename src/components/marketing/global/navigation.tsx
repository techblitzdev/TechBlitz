import Link from 'next/link';
import Logo from '../../ui/logo';
import { Button } from '../../ui/button';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { ArrowRight } from 'lucide-react';

import { NavigationMenuItems } from './navigation-items';
import { useUserServer } from '@/hooks/useUserServer';
import { MobileMenu } from './mobile-menu';

export default async function MarketingNavigation() {
  const user = await useUserServer();
  const isDevelopment = process.env.NEXT_PUBLIC_ENV === 'development';
  const isLoggedIn = Boolean(user?.email);

  return (
    <div className="fixed w-full py-5 z-[1000] bg-[#000000]">
      <div className="container flex items-center justify-between w-full">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Go back to dashboard"
        >
          <Logo />
        </Link>

        {/* Navigation Menu */}
        <div className="absolute left-1/2 transform -translate-x-1/2 py-2 px-4 hidden md:block">
          <NavigationMenuItems />
        </div>

        <div className="block md:hidden">
          {/* Mobile Menu */}
          <MobileMenu
            isDevelopment={isDevelopment}
            isLoggedIn={isLoggedIn}
          />
        </div>

        {/* Right Section */}
        {isLoggedIn ? (
          <Button
            href="/dashboard"
            className="hidden md:block font-onest !bg-gradient-to-r !from-accent !via-accent/70 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors"
          >
            Dashboard
          </Button>
        ) : (
          <div className="items-center gap-x-2 hidden md:flex">
            <Button
              href="/login"
              variant="ghost"
              className="font-onest"
            >
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
        )}
      </div>
    </div>
  );
}
