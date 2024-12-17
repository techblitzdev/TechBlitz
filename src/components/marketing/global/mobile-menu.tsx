'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';
import { ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface MobileMenuProps {
  isLoggedIn: boolean;
  isDevelopment: boolean;
}

export function MobileMenu({ isLoggedIn, isDevelopment }: MobileMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Sheet
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
        >
          <HamburgerMenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] sm:w-[400px] bg-[#000000]"
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center py-4">
            <span className="text-lg font-semibold">Menu</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <Cross1Icon className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="">
            <ul className="flex flex-col space-y-4 py-4 text-2xl font-medium">
              <li>
                <Link
                  href="/features/roadmaps"
                  className="hover:text-accent duration-300"
                >
                  Roadmap
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="hover:text-accent duration-300"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-accent duration-300"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:team@techblitz.dev"
                  className="hover:text-accent duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <div className="mt-auto py-4">
            {isLoggedIn ? (
              <Button
                href="/dashboard"
                className="w-full font-onest !bg-gradient-to-r !from-accent !via-accent/70 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Button>
            ) : (
              <>
                <Button
                  href="/login"
                  variant="ghost"
                  className="w-full font-onest mb-2"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Button>
                {isDevelopment ? (
                  <Button
                    href="/signup"
                    variant="accent"
                    className="w-full font-onest !bg-gradient-to-r !from-accent !via-white/20 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    variant="accent"
                    href="#waitlist-form"
                    className="w-full font-onest !bg-gradient-to-r !from-accent !via-white/20 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Join the Waitlist
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
