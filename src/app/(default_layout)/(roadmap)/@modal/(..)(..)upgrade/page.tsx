'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

export default function UpgradePage({
  children
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
