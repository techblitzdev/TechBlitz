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
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

// icons
import RoadmapIcon from '@/components/ui/icons/roadmap';
import Document from '@/components/ui/icons/document';
import Chart from '@/components/ui/icons/b-chart';
import GithubLogo from '@/components/ui/icons/github';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { Book, Target } from 'lucide-react';
import JavascriptIcon from '@/components/ui/icons/javascript';
import ReactIcon from '@/components/ui/icons/react';
import Award from '@/components/ui/icons/award';
import ChatBot from '@/components/ui/icons/chat-bot';

const components: { title: string; href: string; description: string; icon?: React.ReactNode }[] = [
  // {
  //   title: 'Roadmap',
  //   href: '',
  //   description:
  //     'View our upcoming features and vote on what you would like to see next.'
  // },
  {
    title: 'Blog',
    href: '/blog',
    description: 'Read our latest blog posts for more insights on how to level up your skills.',
    icon: <Book height="24" width="24" />,
  },
  {
    title: 'Changelog',
    href: '/changelog',
    description: 'Release notes for the latest updates.',
    icon: <Document fill="white" height="24" width="24" />,
  },
  {
    title: 'Open Source',
    href: '/open-source',
    description: 'No secrets here, see how we build our platform.',
    icon: <GithubLogo fill="white" height="24" width="24" />,
  },
  {
    title: 'FAQs',
    href: '/faqs',
    description: 'Got a question? We have an answer.',
    icon: <QuestionMarkCircledIcon fill="white" height="24" width="24" />,
  },
];

const features = [
  {
    title: 'Roadmaps',
    href: '/features/roadmap',
    description: 'Personalized learning journeys',
    ariaLabel: 'Navigate to Roadmaps',
    icon: <RoadmapIcon fill="white" height="24" width="24" />,
  },
  {
    title: 'Coding Challenges',
    href: '/features/coding-challenges',
    description: 'Tackle coding challenges to sharpen your developer skills.',
    ariaLabel: 'Navigate to Coding Challenges',
    icon: <Document fill="white" height="24" width="24" />,
  },
  {
    title: 'Statistics',
    href: '/features/statistics',
    description: 'Track your progress and see your growth over time.',
    ariaLabel: 'Navigate to Statistics',
    icon: <Chart fill="white" height="24" width="24" />,
  },
  {
    title: 'Leaderboard',
    href: '/features/leaderboard',
    description: 'See how you stack up against the rest of the community.',
    ariaLabel: 'Navigate to Leaderboard',
    icon: <Award fill="white" height="24" width="24" />,
  },
  {
    title: 'AI Assistant',
    href: '/features/ai-assistant',
    description: 'Get instant help with your coding questions.',
    ariaLabel: 'Navigate to AI Assistant',
    icon: <ChatBot fill="white" height="24" width="24" />,
  },
];

export function NavigationMenuItems() {
  return (
    <NavigationMenu className="py-2 px-4 hidden md:block" aria-label="Main navigation">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger aria-label="Features menu">Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-3 p-4 md:w-[600px] md:grid-cols-2 lg:w-[800px]">
              {features.map((feature) => (
                <ListItem
                  key={feature.title}
                  href={feature.href}
                  title={feature.title}
                  aria-label={feature.ariaLabel}
                  icon={feature.icon}
                >
                  {feature?.description || ''}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger aria-label="Resources menu">Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  aria-label={component.title}
                  icon={component.icon}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger aria-label="Learn menu">Learn</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem
                href="/questions?tag=javascript"
                title="JavaScript"
                icon={<JavascriptIcon className="size-4" />}
              >
                Learn JavaScript with our easy-to-understand coding questions.
              </ListItem>
              <ListItem
                href="/questions?tag=react"
                title="React"
                icon={<ReactIcon className="size-4" />}
              >
                Learn the most popular frontend library.
              </ListItem>
              <ListItem href="/roadmaps" title="Roadmaps" icon={<RoadmapIcon />}>
                Not sure where to start? Explore our list of coding roadmaps.
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
  React.ComponentPropsWithoutRef<'a'> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
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
        <div className="font-medium leading-none flex items-center gap-2">
          <div className="bg-primary rounded-md p-1 border border-black-50 flex items-center justify-center size-10">
            {icon}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">{title}</p>
            <p className="text-xs leading-none text-muted-foreground group-hover:text-white">
              {children}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
});
ListItem.displayName = 'ListItem';
