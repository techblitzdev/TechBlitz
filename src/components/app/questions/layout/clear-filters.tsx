'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function ClearFilters() {
  const router = useRouter();

  return (
    <Button variant="secondary" onClick={() => router.push('/coding-challenges')}>
      Clear filters
    </Button>
  );
}
