'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { HamburgerMenuIcon, Cross1Icon, ChevronDownIcon } from '@radix-ui/react-icons';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser } from '@/hooks/use-user';

interface MenuItem {
  label: string;
  href?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    label: 'Features',
    children: [
      { label: 'Roadmaps', href: '/features/roadmaps' },
      { label: 'Coding Challenges', href: '/features/coding-challenges' },
      { label: 'Statistics', href: '/features/statistics' },
      { label: 'Leaderboard', href: '/features/leaderboard' },
    ],
  },
  {
    label: 'Resources',
    href: '/resources',
    // TODO: add this in a constants file
    children: [
      { label: 'Blog', href: '/blog' },
      { label: 'Changelog', href: '/changelog' },
      { label: 'Open Source', href: '/open-source' },
      { label: 'FAQs', href: '/faqs' },
    ],
  },
  {
    label: 'Learn',
    href: '/roadmaps',
    children: [
      { label: 'JavaScript', href: '/questions?tag=javascript' },
      { label: 'React', href: '/questions?tag=react' },
      { label: 'Roadmaps', href: '/roadmaps' },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();

  const { user: data } = useUser();
  const isLoggedIn = Boolean(data?.email);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const isExpanded = expandedItems.includes(item.label);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <li
        key={item.label}
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          depth > 0 ? 'ml-4' : ''
        )}
      >
        <div
          className={cn('flex items-center justify-between', hasChildren && 'cursor-pointer')}
          onClick={() => hasChildren && toggleExpanded(item.label)}
        >
          {hasChildren ? (
            <span className={cn('py-2 block', depth === 1 && 'text-sm')}>{item.label}</span>
          ) : (
            <Link
              href={item.href || '#'}
              className={cn('hover:text-accent duration-300 py-2 block', depth === 1 && 'text-sm')}
              onClick={() => setIsOpen(false)}
              aria-label={item.label}
            >
              {item.label}
            </Link>
          )}
          {hasChildren && (
            <ChevronDownIcon
              className={cn(
                'h-4 w-4 transition-transform duration-300',
                isExpanded ? 'rotate-180' : ''
              )}
            />
          )}
        </div>
        {hasChildren && (
          <div
            className={cn(
              'overflow-hidden transition-all duration-300 ease-in-out',
              isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            <ul className="mt-2 space-y-2">
              {item.children!.map((child) => renderMenuItem(child, depth + 1))}
            </ul>
          </div>
        )}
      </li>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <div className="relative w-5 h-5">
            <div
              className={cn(
                'absolute inset-0 transition-all duration-300',
                isOpen ? 'opacity-0' : 'opacity-100'
              )}
            >
              <HamburgerMenuIcon className="h-5 w-5" />
            </div>
            <div
              className={cn(
                'absolute inset-0 transition-all duration-300',
                isOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90 scale-50'
              )}
            >
              <Cross1Icon className="h-5 w-5" />
            </div>
          </div>
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-[#000000]">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center py-4">
            <span className="text-lg font-semibold">Menu</span>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <Cross1Icon className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav aria-label="Mobile navigation">
            <ul className="flex flex-col space-y-4 py-4 text-xl font-medium">
              {menuItems.map((item) => renderMenuItem(item))}
            </ul>
          </nav>
          <div className="mt-auto py-4">
            {isLoggedIn ? (
              <Button
                href="/dashboard"
                className="w-full font-onest !bg-gradient-to-r !from-accent !via-accent/70 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors"
                onClick={() => setIsOpen(false)}
                aria-label="Dashboard link"
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
                  aria-label="Login link"
                >
                  Login
                </Button>
                <Button
                  href="/signup"
                  variant="accent"
                  className="w-full font-onest !bg-gradient-to-r !from-accent !via-white/20 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors"
                  onClick={() => setIsOpen(false)}
                  aria-label="Get started link"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
