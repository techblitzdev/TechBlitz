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
import type { SidebarItem } from '@/types/Sidebar';
import AppSidebarSubMenuItem from './sidebar-submenu-item';
import SidebarFooterComponent from './sidebar-footer';

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
  return (
    <Sidebar className="p-2 rounded-xl">
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel>
            <h2 className="text-xl font-bold">{process.env.APP_NAME}</h2>
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
                            <span>{item.title}</span>
                          </div>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <AppSidebarSubMenuItem item={item} />
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </a>
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
