'use client';
import NewQuestionModal from '@/components/questions/new-question-modal';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const paths = pathname.split('/').filter((path) => path); // Remove empty string elements

  return (
    <div className="font-inter flex flex-col gap-y-4">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl">
          <Link href={'/dashboard'} prefetch>
            Home
          </Link>
          {paths.map((path, index) => (
            <span key={index}>
              {' '}
              /{' '}
              <Link
                href={`/${paths.slice(0, index + 1).join('/')}`} // Adjusted breadcrumb generation
                prefetch
              >
                {path}
              </Link>
            </span>
          ))}
        </h1>
        <NewQuestionModal className="w-fit" />
      </div>
      <>
        <Separator />
        {children}
      </>
    </div>
  );
}
