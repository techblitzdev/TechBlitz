'use client';

import {
  FileQuestion,
  Home,
  Settings,
  Award,
  ChartBarIncreasing,
  LockIcon,
  Trash,
  User,
  Bell,
  CreditCard,
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
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import AppSidebarSubMenuItem from './sidebar-submenu-item';
import SidebarFooterComponent from './sidebar-footer';

import type { SidebarItem, SidebarItemType } from '@/types/Sidebar';

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
      title: 'Home',
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
          url: '/questions',
        },
        {
          title: 'Daily Question',
          url: `/question/${todaysQuestion?.uid}`,
        },
        {
          title: 'Previous Questions',
          url: '/previous-questions',
        },
      ],
    },
    {
      title: 'Stats',
      url: '#',
      icon: ChartBarIncreasing,
      chip: ComingSoonChip,
    },
    {
      title: 'Leaderboard',
      url: '/leaderboard/today',
      icon: Award,
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
        <SidebarGroup key={item.groupLabel}>
          <SidebarGroupLabel className="px-0 h-fit">
            {item.groupLabel}
          </SidebarGroupLabel>
        </SidebarGroup>
      );
    }

    return (
      <SidebarMenuItem key={item.title}>
        {item.subItems ? (
          <Collapsible defaultOpen className="group/collapsible">
            <CollapsibleTrigger asChild>
              <SidebarMenuButton asChild>
                <div className="flex items-center w-full">
                  {item.icon && <item.icon />}
                  <span className="font-satoshi text-base">{item.title}</span>
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
            <Link
              href={item.url}
              prefetch
              className={`flex items-center font-satoshi text-base ${
                pathname === item.url ? 'bg-black' : ''
              }`}
            >
              {item.icon && <item.icon />}
              <span className="text-base">{item.title}</span>
              <div className="ms-auto">{item.chip && <item.chip />}</div>
            </Link>
          </SidebarMenuButton>
        )}
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar className="p-3 rounded-xl">
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="w-full flex items-center justify-between">
            <Link
              href="/dashboard"
              className="text-xl font-bold font-satoshi hover:text-white duration-300"
              prefetch
            >
              meerge
            </Link>
            <SidebarTrigger className="size-4 h-full flex items-center my-auto" />
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-4">
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
