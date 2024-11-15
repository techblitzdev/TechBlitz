'use client';

import { formatSeconds } from '@/utils/time';
import { Clock } from 'lucide-react';
import { useStopwatch } from 'react-timer-hook';

export default function Stopwatch() {
  const { seconds, minutes, pause, reset, totalSeconds } = useStopwatch({
    autoStart: true,
  });

  return (
    <div className="flex items-center gap-x-1 text-sm">
      <Clock className="size-4" />
      <p>{formatSeconds(totalSeconds)}</p>
    </div>
  );
}
