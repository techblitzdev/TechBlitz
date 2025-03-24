'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { Settings, LockIcon, User, CreditCard, ChevronDown, ChevronLeft } from 'lucide-react';
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
  useSidebar,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import AppSidebarSubMenuItem from '@/components/app/navigation/sidebar-submenu-item';
import SidebarDropdown from '@/components/app/navigation/sidebar-dropdown';

import type { SidebarItemType } from '@/types/Sidebar';

import { useEffect, useMemo } from 'react';
import type { UserRecord } from '@/types/User';
import type { QuestionWithTags } from '@/types/Questions';
import type { Profile } from '@/types/Profile';
import HomeIcon from '@/components/ui/icons/home';

import Award from '@/components/ui/icons/award';
import SidebarFooter from './sidebar-footer';
import Map from '@/components/ui/icons/map';
import Blog3 from '@/components/ui/icons/blog-3';
import BChart3 from '@/components/ui/icons/b-chart-3';

const LeaderboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
    <path fill="currentColor" d="M2 21V9h5.5v12zm7.25 0V3h5.5v18zm7.25 0V11H22v10z" />
  </svg>
);

const houseIcon = () => <HomeIcon strokewidth={2} />;

interface AppSidebarProps {
  user: UserRecord | null;
  profile: Profile | null;
  suggestion: QuestionWithTags | null;
}

export function AppSidebar({ user, profile, suggestion }: AppSidebarProps) {
  console.log('suggestion', suggestion);
  const pathname = usePathname();

  const { state, setOpenMobile } = useSidebar();

  // close the sidebar whenever the path changes
  // only on mobile
  useEffect(() => {
    setOpenMobile(false);
  }, [pathname]);

  const nonAuthedUserItems: SidebarItemType[] = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: houseIcon,
      tooltip: 'Dashboard',
      disabled: true,
    },
    {
      title: 'Challenges',
      url: '/questions',
      icon: Blog3,
      tooltip: 'Challenges',
    },
    {
      title: 'Roadmaps',
      url: '/roadmaps',
      icon: Map,
      defaultOpen: true,
      subItems: [
        {
          title: 'Official Roadmaps',
          url: '/roadmaps',
          disabled: true,
        },
        {
          title: 'Personalized Roadmaps',
          url: '/personalized-roadmaps',
          disabled: true,
        },
      ],
    },
    {
      title: 'Stats',
      url: '/statistics',
      icon: BChart3,
      tooltip: 'Statistics',
      defaultOpen: false,
      disabled: true,
      subItems: [
        {
          title: 'Overview',
          url: '/statistics',
          disabled: true,
        },
        {
          title: 'Reports',
          tooltip: 'Reports',
          url: '/statistics/reports',
          disabled: true,
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
      title: 'Dashboard',
      url: '/dashboard',
      icon: houseIcon,
      tooltip: 'Dashboard',
    },
    {
      title: 'Challenges',
      url: '/questions',
      icon: Blog3,
      tooltip: 'Challenges',
    },
    {
      title: 'Roadmaps',
      tooltip: 'Roadmaps',
      url: '/roadmaps',
      icon: Map,
      defaultOpen: true,
      subItems: [
        {
          title: 'Official Roadmaps',
          url: '/roadmaps',
          disabled: false,
        },
        {
          title: 'Personalized Roadmaps',
          url: '/personalized-roadmaps',
          disabled: false,
        },
      ],
    },
    {
      title: 'Stats',
      url: '/statistics',
      icon: BChart3,
      tooltip: 'Statistics',
      defaultOpen: false,
      subItems: [
        {
          title: 'Overview',
          url: '/statistics',
          disabled: false,
        },
        {
          title: 'Reports',
          tooltip: 'Reports',
          url: '/statistics/reports',
          disabled: false,
        },
      ],
    },
    {
      title: 'Leaderboard',
      url: '/leaderboard',
      icon: Award,
      tooltip: 'Leaderboard',
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
      title: 'Back',
      url: '/dashboard',
      icon: ChevronLeft,
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

    let menuItems = pathname.startsWith('/settings') ? settingsItems : standardItems;

    // Add admin item only once for admin users
    if (user.userLevel === 'ADMIN') {
      menuItems = [
        ...menuItems,
        {
          title: 'Admin',
          url: '/admin',
          icon: LockIcon,
        },
      ];
    }

    return menuItems;
  }, [user, pathname]);

  const isActive = (url: string) => {
    if (url === '/dashboard') {
      return pathname === url;
    }
    if (url.startsWith('/question')) {
      return pathname.startsWith('/question');
    }
    if (url === '/roadmaps') {
      return pathname.startsWith('/roadmaps') && !pathname.startsWith('/personalized-roadmaps');
    }
    if (url === '/personalized-roadmaps') {
      return pathname.startsWith('/personalized-roadmaps');
    }
    if (url.startsWith('/leaderboard')) {
      return pathname.startsWith('/leaderboard');
    }
    if (url.startsWith('/statistics')) {
      return pathname.startsWith('/statistics');
    }
    if (url.startsWith('/statistics/reports')) {
      return pathname.startsWith('/statistics/reports');
    }
    if (url.startsWith('/settings')) {
      return pathname === url;
    }
    return pathname.startsWith(url);
  };

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
          <Collapsible defaultOpen={item.defaultOpen} className="group/collapsible">
            <CollapsibleTrigger asChild>
              <SidebarMenuButton asChild tooltip={item.tooltip}>
                {state === 'collapsed' ? (
                  <Link href={item.url} className="flex items-center w-full" prefetch>
                    {item.icon && <item.icon />}
                    <span className="text-sm font-inter group-data-[collapsible=icon]:hidden text-black dark:text-white">
                      {item.title}
                    </span>
                    <div className="ms-auto group-data-[collapsible=icon]:hidden">
                      {item.chip && <item.chip />}
                    </div>
                    <div className="group-data-[collapsible=icon]:hidden">
                      <ChevronDown className="size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
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
              isActive={isActive(item.url)}
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
                    isActive(item.url)
                      ? 'bg-black-25 dark:bg-white-25 text-white dark:text-black border border-secondary dark:border-black-50 dark:border-white-50'
                      : ''
                  }`}
                >
                  {item.icon && <item.icon />}
                  <span className="text-sm group-data-[collapsible=icon]:hidden text-black dark:text-white">
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
              <div className="group-data-[collapsible=icon]:hidden">{item.dropdownMenu}</div>
            )}
          </div>
        )}
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar collapsible="icon" className="z-50 group">
      <SidebarContent className="py-6 bg-white dark:bg-[#000000]">
        <SidebarGroup>
          <SidebarGroupLabel className="w-full flex items-center px-0">
            <SidebarDropdown user={user} profile={profile} />
          </SidebarGroupLabel>
          {/* This div will show when the sidebar is collapsed */}
          <div className="hidden group-data-[collapsible=icon]:flex items-center justify-center h-8 mb-5">
            <Link
              href="/dashboard"
              className="text-sm xl:text-2xl font-inter hover:text-white duration-300 size-10 text-black dark:text-white"
              prefetch
              aria-label="Go back to dashboard"
            >
              <SidebarDropdown user={user} profile={profile} />
            </Link>
          </div>
          <SidebarGroupContent className="mt-10 bg-white dark:bg-[#000000]">
            <SidebarMenu>{items.map((item) => renderSidebarItem(item))}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter user={user} />
      <SidebarRail />
    </Sidebar>
  );
}
