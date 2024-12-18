import Link from 'next/link';
import Logo from '@/components/ui/logo';

import { NavigationMenuItems } from './navigation-items';
import { MobileMenu } from './mobile-menu';

import dynamic from 'next/dynamic';
const NavigationButtons = dynamic(() => import('./navigation-buttons'), {
  ssr: false
});

export default function MarketingNavigation() {
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
          <MobileMenu />
        </div>

        <NavigationButtons />
      </div>
    </div>
  );
}
