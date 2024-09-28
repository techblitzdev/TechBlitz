import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

type BreadcrumbWithCustomSeparatorProps = {
  items: {
    href: string;
    label: string;
  }[];
};

export function BreadcrumbWithCustomSeparator({
  items,
}: BreadcrumbWithCustomSeparatorProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Map through the items to generate breadcrumb links */}
        {items.map((item, index) => (
          <BreadcrumbItem key={index}>
            {/* Render as a link if it's not the last item */}
            {index < items.length - 1 ? (
              <>
                <BreadcrumbLink>
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </>
            ) : (
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
