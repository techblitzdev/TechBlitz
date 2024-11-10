import {
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import type { SidebarItem } from '@/types/Sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AppSidebarSubMenuItem(opts: { item: SidebarItem }) {
  const pathname = usePathname();

  const { item } = opts;
  if (!item.subItems) return null;

  return (
    <SidebarMenuSub>
      {item?.subItems.map((subItem) => (
        <div key={subItem.url}>
          <div>
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
          </div>
        </div>
      ))}
    </SidebarMenuSub>
  );
}
