'use client';
import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react';
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
    icon: Inbox,
    subItems: [
      {
        title: 'All',
        url: '/questions',
      },
      {
        title: 'Daily Question',
        url: '/',
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
    icon: Calendar,
  },
  {
    title: 'Leaderboard',
    url: '#',
    icon: Search,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

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
                          <div>
                            {item.icon && <item.icon />}
                            <span className="font-satoshi text-base">
                              {item.title}
                            </span>
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
                        className={`font-satoshi text-base ${
                          pathname == item.url ? 'bg-black' : ''
                        }`}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
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
