'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import {
  FileQuestion,
  Home,
  Settings,
  LockIcon,
  User,
  CreditCard,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import AppSidebarSubMenuItem from '@/components/global/navigation/sidebar-submenu-item';
import SidebarFooterComponent from '@/components/global/navigation/sidebar-footer';
import Logo from '@/components/ui/logo';
import LogoSmall from '@/components/ui/LogoSmall';

import type { SidebarItemType } from '@/types/Sidebar';

import { useMemo } from 'react';
import { UserRecord } from '@/types/User';
import { Question } from '@/types/Questions';
import { Profile } from '@/types/Profile';
import {
  TooltipContent,
  Tooltip,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';

const LeaderboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M2 21V9h5.5v12zm7.25 0V3h5.5v18zm7.25 0V11H22v10z"
    />
  </svg>
);

const statsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="m3.5 18.49l6-6.01l4 4L22 6.92l-1.41-1.41l-7.09 7.97l-4-4L2 16.99z"
    />
  </svg>
);

const roadmapIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 14 14"
  >
    <g
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M7 11.643h6.5m-1.857-1.857l1.857 1.857l-1.857 1.857M3.286 1.893a1.393 1.393 0 1 0 2.786 0a1.393 1.393 0 1 0-2.786 0M7 6.536a1.393 1.393 0 1 0 2.786 0a1.393 1.393 0 1 0-2.786 0m-2.786 5.107a1.393 1.393 0 1 0 2.786 0a1.393 1.393 0 1 0-2.786 0" />
      <path d="M7 6.536H3.054a2.554 2.554 0 0 0 0 5.107h1.16m5.572-5.107h1.393a2.321 2.321 0 0 0 0-4.643H6.07m-2.784 0H.5" />
    </g>
  </svg>
);

const homeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M3 21V3h18v18zm7-2v-6H5v6zm2 0h7v-6h-7zm-7-8h14V5H5z"
    />
  </svg>
);

export function AppSidebar(opts: {
  user: UserRecord | null;
  profile: Profile | null;
  todaysQuestion: Question | null;
  hasAnsweredDailyQuestion: boolean;
}) {
  const { user, todaysQuestion, hasAnsweredDailyQuestion, profile } = opts;
  const pathname = usePathname();

  const { state } = useSidebar();

  const nonAuthedUserItems: SidebarItemType[] = [
    {
      title: 'Questions',
      url: '/questions',
      icon: FileQuestion,
      tooltip: 'Questions',
      subItems: [
        {
          title: 'All',
          url: '/questions',
        },
        {
          title: 'Daily Question',
          url: `/question/${todaysQuestion?.slug}`,
        },
        {
          title: 'Study Paths',
          url: '/questions/study-paths',
        },
      ],
    },
    {
      title: 'Leaderboard',
      url: '/leaderboard',
      icon: LeaderboardIcon,
      tooltip: 'Leaderboard',
    },
  ];

  const standardItems: SidebarItemType[] = [
    {
      groupLabel: 'Menu',
    },
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: homeIcon,
      tooltip: 'Dashboard',
    },
    {
      title: 'Questions',
      url: '/questions',
      icon: FileQuestion,
      tooltip: 'Questions',
      subItems: [
        {
          title: 'All',
          url: '/questions',
        },
        {
          title: 'Study Paths',
          url: '/questions/study-paths',
        },
        {
          title: 'Daily Question',
          url: `/question/${todaysQuestion?.slug}`,
          badge: (
            <>
              {!hasAnsweredDailyQuestion && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="size-2 rounded-full bg-red-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Answer today's question!</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </>
          ),
        },
        {
          title: 'Personalized Questions',
          url: '/questions/custom',
        },
      ],
    },
    {
      title: 'Roadmaps',
      tooltip: 'Roadmaps',
      url: '/roadmaps',
      icon: roadmapIcon,
    },
    {
      title: 'Stats',
      url: '/statistics',
      icon: statsIcon,
      tooltip: 'Statistics',
      subItems: [
        {
          title: 'Overview',
          url: '/statistics',
        },
        {
          title: 'Reports',
          tooltip: 'Reports',
          url: '/statistics/reports',
        },
      ],
    },
    {
      title: 'Leaderboard',
      url: '/leaderboard',
      icon: LeaderboardIcon,
      tooltip: 'Leaderboard',
    },
    {
      groupLabel: 'Support',
    },
    {
      title: 'Help',
      url: 'mailto:team@techblitz.dev',
      icon: HelpCircle,
      tooltip: 'Help',
    },
    {
      title: 'Settings',
      url: '/settings/profile',
      icon: Settings,
      tooltip: 'Settings',
    },
  ];

  const settingsItems: SidebarItemType[] = [
    {
      title: 'Home',
      url: '/dashboard',
      icon: Home,
    },
    {
      groupLabel: 'Settings',
    },
    {
      title: 'Profile',
      url: '/settings/profile',
      icon: User,
    },
    {
      title: 'Account',
      url: '/settings/account',
      icon: Settings,
    },
    {
      title: 'Billing',
      url: '/settings/billing',
      icon: CreditCard,
    },
  ];

  // if user is not authed, show nonAuthedUserItems
  const items = useMemo(() => {
    if (!user) return nonAuthedUserItems;

    let menuItems = pathname.startsWith('/settings')
      ? settingsItems
      : standardItems;

    // Add admin item only once for admin users
    if (user.userLevel === 'ADMIN') {
      menuItems = [
        ...menuItems,
        {
          title: 'Admin',
          url: '/dashboard/admin',
          icon: LockIcon,
        },
      ];
    }

    return menuItems;
  }, [user, pathname]);

  const renderSidebarItem = (item: SidebarItemType) => {
    if ('groupLabel' in item) {
      return (
        <SidebarGroup key={item.groupLabel} className="mt-2">
          <SidebarGroupLabel className="px-0 py-0 h-fit text-sm font-inter">
            {item.groupLabel}
          </SidebarGroupLabel>
        </SidebarGroup>
      );
    }

    return (
      <SidebarMenuItem key={item.url}>
        {item.subItems ? (
          <Collapsible defaultOpen className="group/collapsible">
            <CollapsibleTrigger asChild>
              <SidebarMenuButton asChild tooltip={item.tooltip}>
                {state === 'collapsed' ? (
                  <Link href={item.url} className="flex items-center w-full">
                    {item.icon && <item.icon />}
                    <span className="text-sm font-inter group-data-[collapsible=icon]:hidden">
                      {item.title}
                    </span>
                    <div className="ms-auto group-data-[collapsible=icon]:hidden">
                      {item.chip && <item.chip />}
                    </div>
                    <div className="group-data-[collapsible=icon]:hidden">
                      <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                    </div>
                  </Link>
                ) : (
                  <div className="flex items-center w-full">
                    {item.icon && <item.icon />}
                    <span className="text-sm font-inter group-data-[collapsible=icon]:hidden">
                      {item.title}
                    </span>
                    <div className="ms-auto group-data-[collapsible=icon]:hidden">
                      {item.chip && <item.chip />}
                    </div>
                    <div className="group-data-[collapsible=icon]:hidden">
                      <ChevronDown className="size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                    </div>
                  </div>
                )}
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <AppSidebarSubMenuItem item={item} />
            </CollapsibleContent>
          </Collapsible>
        ) : (
          <div className="flex items-center w-full">
            <SidebarMenuButton
              asChild
              className="flex-grow"
              tooltip={item.tooltip}
            >
              {item.disabled ? (
                <div className="flex items-center font-inter font-medium text-sm p-2 gap-x-2 opacity-50 hover:cursor-not-allowed h-8">
                  {item.icon && <item.icon />}
                  <span className="text-sm font-inter group-data-[collapsible=icon]:hidden">
                    {item.title}
                  </span>
                  <div className="ms-auto group-data-[collapsible=icon]:hidden">
                    {item.chip && <item.chip />}
                  </div>
                </div>
              ) : (
                <Link
                  href={item.url}
                  prefetch
                  className={`flex items-center font-inter font-medium text-sm py-2 ${
                    pathname === item.url
                      ? 'bg-black-25 text-white border border-black-50'
                      : ''
                  }`}
                >
                  {item.icon && <item.icon />}
                  <span className="text-sm group-data-[collapsible=icon]:hidden">
                    {item.title}
                  </span>
                  {item.chip && (
                    <div className="ms-auto group-data-[collapsible=icon]:hidden">
                      {item.chip && <item.chip />}
                    </div>
                  )}
                  {item.badge && (
                    <SidebarMenuBadge className="!bg-transparent group-data-[collapsible=icon]:hidden">
                      {item.badge}
                    </SidebarMenuBadge>
                  )}
                </Link>
              )}
            </SidebarMenuButton>
            {item.dropdownMenu && (
              <div className="group-data-[collapsible=icon]:hidden">
                {item.dropdownMenu}
              </div>
            )}
          </div>
        )}
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar collapsible="icon" className="z-50 group">
      <SidebarContent className="py-6 bg-[#000000]">
        <SidebarGroup>
          <SidebarGroupLabel className="w-full flex items-center justify-between">
            {user ? (
              <Link
                href="/dashboard"
                className="text-sm xl:text-2xl font-inter hover:text-white duration-300"
                prefetch
                aria-label="Go back to dashboard"
              >
                <Logo />
              </Link>
            ) : (
              <div className="text-sm xl:text-2xl font-inter hover:text-white duration-300">
                <Logo />
              </div>
            )}
            <SidebarTrigger className="size-5 h-7 opacity-0 group-hover:opacity-100 duration-300 -right-1 group-hover:right-0 transition-all" />
          </SidebarGroupLabel>
          {/* This div will show when the sidebar is collapsed */}
          <div className="hidden group-data-[collapsible=icon]:flex items-center justify-center h-8 mb-5">
            <Link
              href="/dashboard"
              className="text-sm xl:text-2xl font-inter hover:text-white duration-300 size-10"
              prefetch
              aria-label="Go back to dashboard"
            >
              <LogoSmall />
            </Link>
          </div>
          <SidebarGroupContent className="mt-5 bg-[#000000]">
            <SidebarMenu>
              {items.map((item) => renderSidebarItem(item))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooterComponent user={user} profile={profile} />
      <SidebarRail />
    </Sidebar>
  );
}
