'use client';

import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/utils/cn';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import Logo from '@/components/global/logo';

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Roadmap',
    href: '/roadmap',
    description:
      'View our upcoming features and vote on what you would like to see next.'
  },
  {
    title: 'Open Source',
    href: '/open-source',
    description: 'No secrets here, see how we build our platform.'
  },
  {
    title: 'Changelog',
    href: '/changelog',
    description: 'Stay up to date with the latest changes to our techblitz.'
  },
  {
    title: 'FAQs',
    href: '/faqs',
    description: 'Got a question? We have an answer.'
  }
];

export function NavigationMenuItems() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Product</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid p-4 md:w-[400px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
              <ListItem
                href="/features/roadmap"
                title="Roadmaps"
              >
                Ai powered progression paths
              </ListItem>
              <ListItem
                href="/features/daily-questions"
                title="Daily Questions"
              >
                Daily questions to help you grow as a developer
              </ListItem>
              <ListItem
                href="/features/leaderboards"
                title="Leaderboards"
              >
                Leaderboards to battle with friends
              </ListItem>
              <ListItem
                href="/features/"
                title="Statistics"
              >
                Statistics to track your progress
              </ListItem>
              <ListItem
                href="/features/daily-questions"
                title="Questions"
              >
                Questions that are actually useful, not just for the sake of it
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href="/docs"
            legacyBehavior
            passHref
          >
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Pricing
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href="/contact"
            legacyBehavior
            passHref
          >
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:!text-white',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground group-hover:text-white">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
