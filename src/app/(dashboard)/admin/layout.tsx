'use client';
import NewQuestionModal from '@/components/questions/new-question-modal';
import { Separator } from '@/components/ui/separator';
import { usePathname } from 'next/navigation';
import { BreadcrumbWithCustomSeparator } from '@/components/global/breadcrumbs';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const paths = pathname.split('/').filter((path) => path); // Remove empty string elements

  const items = [
    {
      href: '/dashboard',
      label: 'Home',
    },
    ...paths.map((path, index) => ({
      href: `/${paths.slice(0, index + 1).join('/')}`,
      label: path,
    })),
  ];

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex justify-between items-center px-6">
        <h1 className="text-xl md:text-3xl font-satoshi font-semibold">
          Questions
        </h1>
        <NewQuestionModal className="w-fit" />
      </div>
      <>
        <Separator className="bg-black-50" />
        {children}
      </>
    </div>
  );
}
