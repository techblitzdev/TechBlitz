'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function AdminButton({ ...props }) {
  const router = useRouter();
  const toAdminPage = () => router.push('/admin');
  return (
    <Button onClick={toAdminPage} {...props}>
      To admin page
    </Button>
  );
}
