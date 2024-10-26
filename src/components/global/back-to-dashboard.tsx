import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function BackToDashboard() {
  return (
    <Link href="/dashboard" prefetch>
      <ChevronLeft className="size-4" />
    </Link>
  );
}
