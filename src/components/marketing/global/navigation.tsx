import Link from 'next/link';
import Logo from '../../global/logo';
import { Button } from '../../ui/button';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { ArrowRight } from 'lucide-react';

import { NavigationMenuItems } from './navigation-items';

export default function MarketingNavigation() {
  return (
    <div className="sticky top-4 z-50 bg-[#000000] pb-5">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <div className="absolute left-1/2 transform -translate-x-1/2 py-2 px-4 hidden md:block">
          <NavigationMenuItems />
        </div>
        <div className="items-center gap-x-2 hidden md:flex">
          <Button
            href="/login"
            variant="ghost"
            className="font-onest"
          >
            Login
          </Button>
          <Button
            href="signup"
            variant="accent"
            className="font-onest !bg-gradient-to-r !from-accent !via-white/20 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors"
          >
            Get Started
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
        <HamburgerMenuIcon className="size-5 block md:hidden" />
      </div>
    </div>
  );
}