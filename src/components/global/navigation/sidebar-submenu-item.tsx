import {
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import type { SidebarItem } from '@/types/Sidebar';
import Link from 'next/link';

export default function AppSidebarSubMenuItem(opts: { item: SidebarItem }) {
  const { item } = opts;
  if (!item.subItems) return null;

  return (
    <SidebarMenuSub>
      {item?.subItems.map((subItem) => (
        <SidebarMenuSubItem key={subItem.title}>
          <SidebarMenuSubButton asChild>
            <Link href={subItem.url} prefetch className="font-ubuntu text-lg">
              {subItem.title}
            </Link>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      ))}
    </SidebarMenuSub>
  );
}
