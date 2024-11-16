'use client';
import {
  FileQuestion,
  Home,
  Settings,
  Award,
  ChartBarIncreasing,
  LockIcon,
  User,
  Bell,
  CreditCard,
  RouteIcon,
  HelpCircle,
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
  SidebarMenuSub,
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
import ComingSoonChip from '../coming-soon';
import { useUser } from '@/hooks/useUser';

export function AppSidebar() {
  const pathname = usePathname();

  const { user } = useUser();

  const { data: todaysQuestion } = useQuery({
    queryKey: ['not-found'],
    queryFn: () => getTodaysQuestion(),
  });

  // Menu items
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
          (user?.userLevel === 'PREMIUM' &&
            !pathname.startsWith('/settings')) ? (
            <p>Progression</p>
          ) : (
            <div className="flex items-center gap-3">
              <p>Progression</p>
              <LockIcon className="size-4" />
            </div>
          )}
        </>
      ),
      url: '#',
      icon: RouteIcon,
      disabled: user?.userLevel !== 'ADMIN' && user?.userLevel !== 'PREMIUM',
    },
    {
      title: 'Stats',
      url: '/',
      icon: ChartBarIncreasing,
      chip: ComingSoonChip,
    },
    {
      title: 'Leaderboard',
      url: '/leaderboard/today',
      icon: Award,
    },
    {
      groupLabel: 'Support',
    },
    {
      title: 'Help',
      url: '/help',
      icon: HelpCircle,
    },
    {
      title: 'Settings',
      url: '/settings/profile',
      icon: Settings,
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
    {
      title: 'Notifications',
      url: '/settings/notifications',
      icon: Bell,
    },
  ];

  // dynamically set the items we use based on the page
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
          <SidebarGroupLabel className="px-0 py-0 h-fit text-sm font-ubuntutoshi">
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
                  <span className="text-sm font-ubuntutoshi">{item.title}</span>
                  <div className="ms-auto">{item.chip && <item.chip />}</div>
                </div>
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <AppSidebarSubMenuItem item={item} />
            </CollapsibleContent>
          </Collapsible>
        ) : (
          <SidebarMenuButton asChild>
            {item.disabled ? (
              <SidebarMenuItem className="flex items-center font-ubuntu text-sm p-2 gap-x-2 opacity-50 hover:cursor-not-allowed h-8">
                {item.icon && <item.icon />}
                <span className="text-sm font-ubuntutoshi">{item.title}</span>
                <div className="ms-auto">{item.chip && <item.chip />}</div>
              </SidebarMenuItem>
            ) : (
              <Link
                href={item.url}
                prefetch
                className={`flex items-center font-ubuntu text-sm py-2 ${
                  pathname === item.url
                    ? 'bg-white text-black border border-black-75'
                    : ''
                }`}
              >
                {item.icon && <item.icon />}
                <span className="text-sm">
                  <>{item.title}</>
                </span>
                {item.chip && (
                  <div className="ms-auto">{item.chip && <item.chip />}</div>
                )}
              </Link>
            )}
          </SidebarMenuButton>
        )}
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar>
      <SidebarContent className="py-6">
        <SidebarGroup>
          <SidebarGroupLabel className="w-full flex items-center justify-between">
            <Link
              href="/dashboard"
              className="text-sm xl:text-2xl font-ubuntu hover:text-white duration-300"
              prefetch
            >
              TechBlitz
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-5">
            <SidebarMenu>
              {items.map((item) => renderSidebarItem(item))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooterComponent />
    </Sidebar>
  );
}
