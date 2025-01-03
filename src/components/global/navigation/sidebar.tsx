'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

import {
  FileQuestion,
  Home,
  Settings,
  Award,
  ChartBarIncreasing,
  LockIcon,
  User,
  CreditCard,
  RouteIcon,
  HelpCircle,
  MoreHorizontal,
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
  SidebarMenuAction,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LogoutButton from '@/components/auth/logout';
import Logo from '@/components/ui/logo';
import LogoSmall from '@/components/ui/LogoSmall';

import type { SidebarItemType } from '@/types/Sidebar';

import { getTodaysQuestion } from '@/actions/questions/get-today';
import { useUser } from '@/hooks/use-user';
import { userAnsweredDailyQuestion } from '@/actions/questions/user-answered-daily-question';

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  const { state } = useSidebar();

  const { data: todaysQuestion } = useQuery({
    queryKey: ['not-found'],
    queryFn: () => getTodaysQuestion(),
  });

  const { data: hasAnsweredDailyQuestion } = useQuery({
    queryKey: [`user-has-answered-daily-question-${todaysQuestion?.uid}`],
    queryFn: () =>
      userAnsweredDailyQuestion({
        questionUid: todaysQuestion?.uid || '',
        userUid: user?.uid || '',
      }),
    enabled: !!todaysQuestion?.uid,
  });

  const standardItems: SidebarItemType[] = [
    {
      groupLabel: 'Menu',
    },
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: Home,
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
          title: 'Daily Question',
          url: `/question/${todaysQuestion?.uid}`,
          badge: hasAnsweredDailyQuestion ? '' : 'New',
        },
        {
          title: 'All Daily Questions',
          url: '/questions/previous',
        },
        {
          title: 'Custom Questions',
          url: '/questions/custom',
        },
      ],
    },
    {
      title: (
        <>
          {user?.userLevel === 'ADMIN' ||
          user?.userLevel === 'PREMIUM' ||
          (user?.userLevel === 'STANDARD' &&
            !pathname.startsWith('/settings')) ? (
            <p>Roadmaps</p>
          ) : (
            <div className="flex items-center gap-3 opacity-50 hover:cursor-not-allowed">
              <p>Roadmaps</p>
              <LockIcon className="size-3" />
            </div>
          )}
        </>
      ),
      tooltip: 'Roadmaps',
      url: '/roadmaps',
      icon: RouteIcon,
      disabled: user?.userLevel === 'FREE',
    },
    {
      title: 'Stats',
      url: '/statistics',
      icon: ChartBarIncreasing,
      tooltip: 'Statistics',
      subItems: [
        {
          title: 'Overview',
          url: '/statistics',
        },
        {
          title: (
            <>
              {user?.userLevel === 'PREMIUM' || user?.userLevel === 'ADMIN' ? (
                'Reports'
              ) : (
                <div className="flex items-center gap-3 opacity-50 hover:cursor-not-allowed">
                  <p>Reports</p>
                  <LockIcon className="size-3" />
                </div>
              )}
            </>
          ),
          tooltip: 'Reports',
          url: '/statistics/reports',
          disabled: user?.userLevel !== 'PREMIUM',
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
      dropdownMenu: (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuAction>
              <MoreHorizontal />
            </SidebarMenuAction>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="right"
            align="start"
            className="bg-black-75 border border-black-50 text-white hover:text-white"
          >
            <DropdownMenuItem>
              <LogoutButton variant="ghost" padding="none" />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/settings/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/settings/account">Account</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/settings/billing">Billing</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
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

  const items = pathname.startsWith('/settings')
    ? settingsItems
    : standardItems;

  if (user?.userLevel === 'ADMIN') {
    items.push({
      title: 'Admin',
      url: '/admin',
      icon: LockIcon,
    });
  }

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
                    <SidebarMenuBadge className="bg-accent !text-xs text-white group-data-[collapsible=icon]:hidden">
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
    <Sidebar collapsible="icon">
      <SidebarContent className="py-6 bg-[#000000]">
        <SidebarGroup>
          <SidebarGroupLabel className="w-full flex items-center justify-between">
            <Link
              href="/dashboard"
              className="text-sm xl:text-2xl font-inter hover:text-white duration-300"
              prefetch
              aria-label="Go back to dashboard"
            >
              <Logo />
            </Link>
            <SidebarTrigger />
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
      <SidebarFooterComponent />
      <SidebarRail />
    </Sidebar>
  );
}
