'use client';
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
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import AppSidebarSubMenuItem from './sidebar-submenu-item';
import SidebarFooterComponent from './sidebar-footer';

import type { SidebarItemType } from '@/types/Sidebar';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getTodaysQuestion } from '@/actions/questions/get-today';
import { useUser } from '@/hooks/useUser';
import { userAnsweredDailyQuestion } from '@/actions/questions/user-answered-daily-question';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LogoutButton from '@/components/auth/logout';
import Logo from '@/components/ui/logo';
import LogoSmall from '@/components/ui/LogoSmall';

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useUser();

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
    },
    {
      title: 'Questions',
      url: '/questions',
      icon: FileQuestion,
      subItems: [
        {
          title: 'All',
          url: '/questions/all',
        },
        {
          title: 'Daily Question',
          url: `/question/${todaysQuestion?.uid}`,
          badge: hasAnsweredDailyQuestion ? '' : 'New',
        },
        {
          title: 'All Daily Questions',
          url: '/previous-questions',
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
      url: '/roadmaps',
      icon: RouteIcon,
      disabled: user?.userLevel !== 'ADMIN' && user?.userLevel !== 'PREMIUM',
    },
    {
      title: 'Stats',
      url: '/statistics',
      icon: ChartBarIncreasing,
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
          url: '/statistics/reports',
          disabled: user?.userLevel !== 'PREMIUM',
        },
      ],
    },
    {
      title: 'Leaderboard',
      url: '/leaderboard',
      icon: Award,
    },
    {
      groupLabel: 'Support',
    },
    {
      title: 'Help',
      url: 'mailto:team@techblitz.dev',
      icon: HelpCircle,
    },
    {
      title: 'Settings',
      url: '/settings/profile',
      icon: Settings,
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
              <SidebarMenuButton asChild>
                <div className="flex items-center w-full">
                  {item.icon && <item.icon />}
                  <span className="text-sm font-inter">{item.title}</span>
                  <div className="ms-auto">{item.chip && <item.chip />}</div>
                </div>
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <AppSidebarSubMenuItem item={item} />
            </CollapsibleContent>
          </Collapsible>
        ) : (
          <div className="flex items-center w-full">
            <SidebarMenuButton asChild className="flex-grow">
              {item.disabled ? (
                <div className="flex items-center font-inter font-medium  text-sm p-2 gap-x-2 opacity-50 hover:cursor-not-allowed h-8">
                  {item.icon && <item.icon />}
                  <span className="text-sm font-inter">{item.title}</span>
                  <div className="ms-auto">{item.chip && <item.chip />}</div>
                </div>
              ) : (
                <Link
                  href={item.url}
                  prefetch
                  className={`flex items-center font-inter font-medium  text-sm py-2 ${
                    pathname === item.url
                      ? 'bg-black-25 text-white border border-black-50'
                      : ''
                  }`}
                >
                  {item.icon && <item.icon />}
                  <span className="text-sm">{item.title}</span>
                  {item.chip && (
                    <div className="ms-auto">{item.chip && <item.chip />}</div>
                  )}
                  {item.badge && (
                    <SidebarMenuBadge className="bg-accent !text-xs text-white">
                      {item.badge}
                    </SidebarMenuBadge>
                  )}
                </Link>
              )}
            </SidebarMenuButton>
            {item.dropdownMenu && <div className="">{item.dropdownMenu}</div>}
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
              className="text-sm xl:text-2xl font-ubuntu hover:text-white duration-300"
              prefetch
              aria-label="Go back to dashboard"
            >
              <Logo />
            </Link>
          </SidebarGroupLabel>
          {/* This div will show when the sidebar is collapsed */}
          <div className="hidden group-data-[collapsible=icon]:flex items-center justify-center h-8 mb-5">
            <Link
              href="/dashboard"
              className="text-sm xl:text-2xl font-ubuntu hover:text-white duration-300 size-10"
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
