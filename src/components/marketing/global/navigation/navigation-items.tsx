'use client';
import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';

const components: { title: string; href: string; description: string }[] = [
  // {
  //   title: 'Roadmap',
  //   href: '',
  //   description:
  //     'View our upcoming features and vote on what you would like to see next.'
  // },
  {
    title: 'Blog',
    href: '/blog',
    description:
      'Read our latest blog posts for more insights on how to level up your skills.'
  },
  {
    title: 'Changelog',
    href: '/changelog',
    description: 'Release notes for the latest updates.'
  },
  {
    title: 'Open Source',
    href: '/open-source',
    description: 'No secrets here, see how we build our platform.'
  },
  // {
  //   title: 'Changelog',
  //   href: '/changelog',
  //   description: 'Stay up to date with the latest changes to techblitz.'
  // },
  {
    title: 'FAQs',
    href: '/faqs',
    description: 'Got a question? We have an answer.'
  }
];

const features = [
  {
    title: 'Roadmaps',
    href: '/features/roadmap',
    description: 'Personalized paths to accelerate your learning journey.',
    ariaLabel: 'Navigate to Roadmaps'
  },
  {
    title: 'Daily Challenges',
    href: '/features/daily-coding-challenges',
    description: 'Tackle daily challenges to sharpen your developer skills.',
    ariaLabel: 'Navigate to Daily Challenges'
  },
  {
    title: 'Statistics',
    href: '/features/statistics',
    description: 'Track your progress and see your growth over time.',
    ariaLabel: 'Navigate to Statistics'
  },
  {
    title: 'Leaderboard',
    href: '/features/leaderboard',
    description: 'See how you stack up against the rest of the community.',
    ariaLabel: 'Navigate to Leaderboard'
  }
];

export function NavigationMenuItems() {
  return (
    <NavigationMenu
      className="py-2 px-4 hidden md:block"
      aria-label="Main navigation"
    >
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger aria-label="Features menu">
            Features
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {features.map((feature) => (
                <ListItem
                  key={feature.title}
                  href={feature.href}
                  title={feature.title}
                  aria-label={feature.ariaLabel}
                >
                  {feature.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger aria-label="Resources menu">
            Resources
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  aria-label={component.title}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger aria-label="Learn menu">
            Learn
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem
                href="/questions?tag=javascript"
                title="JavaScript"
              >
                Learn JavaScript with our easy-to-understand coding questions.
              </ListItem>
              <ListItem
                href="/questions?tag=react"
                title="React"
              >
                Learn the most popular frontend library.
              </ListItem>
              <ListItem
                href="/questions/study-paths"
                title="Study Paths"
              >
                Not sure where to start? Explore our study paths.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href="/pricing"
            legacyBehavior
            passHref
            className="!text-white focus:!text-white"
            aria-label="Navigate to Pricing"
          >
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Pricing
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
      <Link
        href={props.href || '/'}
        ref={ref}
        className={cn(
          'group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-white hover:!text-white !font-onest',
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground group-hover:text-white">
          {children}
        </p>
      </Link>
    </li>
  );
});
ListItem.displayName = 'ListItem';
