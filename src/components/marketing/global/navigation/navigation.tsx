import Link from 'next/link';
import Logo from '@/components/ui/logo';

import { NavigationMenuItems } from './navigation-items';
import { MobileMenu } from './mobile-menu';

import dynamic from 'next/dynamic';
const NavigationButtons = dynamic(() => import('./navigation-buttons'), {
  ssr: false,
});

import { GithubStars } from './navigation-buttons';

export default function MarketingNavigation() {
  return (
    <div className="fixed w-full py-5 z-[1000] bg-[#000000]">
      <div className="container flex items-center justify-between w-full">
        <Link href="/" aria-label="Go back to dashboard">
          <Logo />
        </Link>

        <div className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 py-2 px-4 hidden lg:block">
          <NavigationMenuItems />
        </div>

        {/* Right side content */}
        <div className="flex items-center gap-x-2">
          {/* Show NavigationButtons only on desktop */}
          <div className="hidden lg:block h-9">
            <NavigationButtons />
          </div>

          {/* Show GitHub stars and mobile menu on mobile */}
          <div className="flex items-center gap-x-2 lg:hidden">
            <GithubStars />
            <MobileMenu />
          </div>
        </div>
      </div>
    </div>
  );
}
