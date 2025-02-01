'use client';

import { formatSeconds } from '@/utils/time';
import { Clock } from 'lucide-react';

export default function Stopwatch(otps: { totalSeconds: number }) {
  const { totalSeconds } = otps;

  return (
    <div className="flex items-center gap-x-1 text-sm">
      <Clock className="size-4" />
      <p>{formatSeconds(totalSeconds)}</p>
    </div>
  );
}
