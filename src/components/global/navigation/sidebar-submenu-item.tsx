import {
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import type { SidebarItem } from '@/types/Sidebar';
import { cn } from '@/utils/cn';
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
          <SidebarMenuSubButton
            asChild
            className={cn(
              'duration-300',
              pathname === subItem.url
                ? 'hover:bg-white/60'
                : 'hover:bg-sidebar-accent'
            )}
          >
            <Link
              href={subItem.url}
              prefetch
              className={`flex items-center font-ubuntu text-sm py-2 ${
                pathname === subItem.url
                  ? 'bg-white !text-black border border-black-75'
                  : ''
              }`}
            >
              {subItem.title}
            </Link>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      ))}
    </SidebarMenuSub>
  );
}
