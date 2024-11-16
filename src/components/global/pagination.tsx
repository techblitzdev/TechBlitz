import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/utils/cn';

export default function GlobalPagination(opts: {
  currentPage: number;
  totalPages: number;
  href: string;
  paramName: string;
}) {
  const { currentPage, totalPages, href, paramName } = opts;

  return (
    <div className="mt-5 w-full flex justify-center items-center gap-x-2">
      <Link
        href={`${href}?${paramName}=${currentPage - 1}`}
        className={cn(
          'bg-black-75 border border-black-50 rounded-md size-8 flex items-center justify-center text-sm',
          `${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`
        )}
      >
        <ArrowLeft className="size-5" />
      </Link>

      {/** display 1-8 pages, then last page at the end with '...' inbetween */}
      {Array.from({ length: totalPages > 6 ? 6 : totalPages }, (_, i) => (
        <Link
          key={i}
          href={`${href}?${paramName}=${i + 1}`}
          className={cn(
            'bg-black-75 border border-black-50 hover:bg-black-50 duration-300 rounded-md size-8 flex items-center justify-center p-1 text-sm',
            `${currentPage === i + 1 ? 'pointer-events-none opacity-50' : ''}`
          )}
        >
          {i + 1}
        </Link>
      ))}
      {totalPages > 6 && (
        <div className="bg-black-75 border border-black-50 rounded-md size-8 flex items-center justify-center p-2">
          <span>...</span>
        </div>
      )}
      <Link
        href={`${href}?${paramName}=${totalPages}`}
        className={cn(
          'bg-black-75 border border-black-50 hover:bg-black-50 duration-300 rounded-md size-8 flex items-center justify-center p-1 text-sm',
          `${
            currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
          }`
        )}
      >
        {totalPages}
      </Link>

      <Link
        href={`${href}?${paramName}=${currentPage + 1}`}
        className={cn(
          'bg-black-75 border border-black-50 hover:bg-black-50 duration-300 rounded-md size-8 flex justify-center items-center',
          `${
            currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
          }`
        )}
      >
        <ArrowRight className="size-5" />
      </Link>
    </div>
  );
}
