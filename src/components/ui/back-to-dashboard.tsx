import { useUserServer } from '@/hooks/use-user-server';
import { ChevronLeft, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function BackToDashboard(opts: { href?: string }) {
  const { href = '/dashboard' } = opts;

  const user = await useUserServer();
  if (!user) {
    return null;
  }

  return (
    <Link
      href={href}
      prefetch
      className="hidden md:flex bg-black-100 border border-black-50 p-2 rounded-md relative group duration-200 size-8 items-center justify-center"
    >
      <ChevronLeft className="size-4 opacity-100 group-hover:opacity-0 absolute duration-100" />
      <ArrowLeft className="size-4 opacity-0 group-hover:opacity-100 absolute duration-100" />
    </Link>
  );
}
