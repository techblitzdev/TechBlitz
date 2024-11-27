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
  MoreHorizontal
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
  SidebarTrigger,
  SidebarRail
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
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
import { userAnsweredDailyQuestion } from '@/actions/questions/user-answered-daily-question';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import LogoutButton from '../logout';
import Logo from '../logo';

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  const { data: todaysQuestion } = useQuery({
    queryKey: ['not-found'],
    queryFn: () => getTodaysQuestion()
  });

  const { data: hasAnsweredDailyQuestion, isLoading } = useQuery({
    queryKey: [`user-has-answered-daily-question-${todaysQuestion?.uid}`],
    queryFn: () =>
      userAnsweredDailyQuestion({
        questionUid: todaysQuestion?.uid || '',
        userUid: user?.uid || ''
      }),
    enabled: !!todaysQuestion?.uid
  });

  const standardItems: SidebarItemType[] = [
    {
      groupLabel: 'Menu'
    },
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: Home
    },
    {
      title: 'Questions',
      url: '/questions',
      icon: FileQuestion,
      subItems: [
        {
          title: 'All',
          url: '/questions/all'
        },
        {
          title: 'Daily Question',
          url: `/question/${todaysQuestion?.uid}`,
          badge: hasAnsweredDailyQuestion ? '' : 'New'
        },
        {
          title: 'All Daily Questions',
          url: '/previous-questions'
        }
      ]
    },
    {
      title: (
        <>
          {user?.userLevel === 'ADMIN' ||
          user?.userLevel === 'PREMIUM' ||
          (user?.userLevel === 'STANDARD' &&
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
      url: '/roadmaps',
      icon: RouteIcon,
      disabled: user?.userLevel !== 'ADMIN' && user?.userLevel !== 'PREMIUM'
    },
    {
      title: 'Stats',
      url: '/',
      icon: ChartBarIncreasing,
      chip: ComingSoonChip
    },
    {
      title: 'Leaderboard',
      url: '/leaderboard',
      icon: Award
    },
    {
      groupLabel: 'Support'
    },
    {
      title: 'Help',
      url: '/help',
      icon: HelpCircle
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
              <LogoutButton
                variant="ghost"
                padding="none"
              />
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
      )
    }
  ];

  const settingsItems: SidebarItemType[] = [
    {
      title: 'Home',
      url: '/dashboard',
      icon: Home
    },
    {
      groupLabel: 'Settings'
    },
    {
      title: 'Profile',
      url: '/settings/profile',
      icon: User
    },
    {
      title: 'Account',
      url: '/settings/account',
      icon: Settings
    },
    {
      title: 'Billing',
      url: '/settings/billing',
      icon: CreditCard
    },
    {
      title: 'Notifications',
      url: '/settings/notifications',
      icon: Bell
    }
  ];

  const items = pathname.startsWith('/settings')
    ? settingsItems
    : standardItems;

  if (user?.userLevel === 'ADMIN') {
    items.push({
      title: 'Admin',
      url: '/admin',
      icon: LockIcon
    });
  }

  const renderSidebarItem = (item: SidebarItemType) => {
    if ('groupLabel' in item) {
      return (
        <SidebarGroup
          key={item.groupLabel}
          className="mt-2"
        >
          <SidebarGroupLabel className="px-0 py-0 h-fit text-sm font-ubuntutoshi">
            {item.groupLabel}
          </SidebarGroupLabel>
        </SidebarGroup>
      );
    }

    return (
      <SidebarMenuItem key={item.url}>
        {item.subItems ? (
          <Collapsible
            defaultOpen
            className="group/collapsible"
          >
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
          <div className="flex items-center w-full">
            <SidebarMenuButton
              asChild
              className="flex-grow"
            >
              {item.disabled ? (
                <div className="flex items-center font-ubuntu text-sm p-2 gap-x-2 opacity-50 hover:cursor-not-allowed h-8">
                  {item.icon && <item.icon />}
                  <span className="text-sm font-ubuntutoshi">{item.title}</span>
                  <div className="ms-auto">{item.chip && <item.chip />}</div>
                </div>
              ) : (
                <Link
                  href={item.url}
                  prefetch
                  className={`flex items-center font-ubuntu text-sm py-2 ${
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
    <Sidebar>
      <SidebarContent className="py-6 bg-[#000000]">
        <SidebarGroup>
          <SidebarGroupLabel className="w-full flex items-center justify-between">
            <Link
              href="/dashboard"
              className="text-sm xl:text-2xl font-ubuntu hover:text-white duration-300"
              prefetch
            >
              <Logo />
            </Link>
          </SidebarGroupLabel>
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
