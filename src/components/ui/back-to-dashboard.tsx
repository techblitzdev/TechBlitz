import { useUserServer } from '@/hooks/use-user-server';
import { ChevronLeft, ArrowLeft } from 'lucide-react';
import { Button } from './button';

export default async function BackToDashboard(opts: { href?: string }) {
  const { href = '/dashboard' } = opts;

  const user = await useUserServer();
  if (!user) {
    return null;
  }

  return (
    <Button
      href={href}
      variant="default"
      size="icon"
      wrapperClassName="flex items-center"
    >
      <ChevronLeft className="size-4 opacity-100 group-hover:opacity-0 absolute duration-100" />
      <ArrowLeft className="size-4 opacity-0 group-hover:opacity-100 absolute duration-100" />
    </Button>
  );
}
