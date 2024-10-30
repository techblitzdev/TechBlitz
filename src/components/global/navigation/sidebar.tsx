'use client';

import {
  FileQuestion,
  Home,
  Settings,
  Award,
  ChartBarIncreasing,
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
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import AppSidebarSubMenuItem from './sidebar-submenu-item';
import SidebarFooterComponent from './sidebar-footer';

//types
import type { SidebarItem } from '@/types/Sidebar';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getTodaysQuestion } from '@/actions/questions/get-today';
import ComingSoonChip from '../coming-soon';

export function AppSidebar() {
  const pathname = usePathname();

  const { data: todaysQuestion } = useQuery({
    queryKey: ['not-found'],
    queryFn: () => getTodaysQuestion(),
  });

  // Menu items
  const items: SidebarItem[] = [
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
      url: '/settings',
      icon: Settings,
    },
  ];

  return (
    <Sidebar className="p-2 rounded-xl">
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel>
            <h2 className="text-xl font-bold font-satoshi">meerge</h2>
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-4">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.subItems ? (
                    <Collapsible defaultOpen className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton asChild>
                          <div className="flex items-centerw-full">
                            {item.icon && <item.icon />}
                            <span className="font-satoshi text-sm">
                              {item.title}
                            </span>
                            <div className="ms-auto">
                              {item.chip && <item.chip />}
                            </div>
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
                          pathname == item.url ? 'bg-black' : ''
                        }`}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <div className="ms-auto">
                          {item.chip && <item.chip />}
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooterComponent />
    </Sidebar>
  );
}
