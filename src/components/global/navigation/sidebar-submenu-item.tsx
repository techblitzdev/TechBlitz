import {
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuBadge,
} from '@/components/ui/sidebar';
import type { SidebarItem } from '@/types/Sidebar';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AppSidebarSubMenuItem(opts: { item: SidebarItem }) {
  const pathname = usePathname();

  const { item } = opts;
  if (!item.subItems) return null;

  return (
    <SidebarMenuSub>
      {item?.subItems.map((subItem) => (
        <SidebarMenuSubItem key={subItem.url}>
          <SidebarMenuSubButton asChild className={cn('duration-300')}>
            <Link
              href={subItem.url}
              prefetch
              className={`flex items-center justify-between font-inter text-sm py-2 ${
                pathname === subItem.url
                  ? 'bg-black-25 text-white border border-black-50'
                  : ''
              }`}
            >
              {subItem.title}

              {subItem.badge && (
                <SidebarMenuBadge className="bg-accent !text-[10px] text-white">
                  {subItem.badge}
                </SidebarMenuBadge>
              )}
            </Link>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      ))}
    </SidebarMenuSub>
  );
}
