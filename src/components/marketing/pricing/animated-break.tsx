'use client';

import { useEffect, useState } from 'react';

export function AnimatedBreak() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span className="inline-block relative px-1">
      break
      <span className="absolute left-0 top-0 whitespace-nowrap">
        <span
          className={`inline-block transition-all duration-500 !leading-[1.1] text-gradient from-white to-white/75 ${
            animate ? 'opacity-100 -translate-x-0.5 -translate-y-0.5 rotate-12' : 'opacity-0'
          }`}
        >
          br
        </span>
        <span
          className={`inline-block transition-all duration-500 !leading-[1.1] text-gradient from-white to-white/75 ${
            animate ? 'opacity-100 translate-x-0.5 translate-y-0.5 -rotate-12' : 'opacity-0'
          }`}
        >
          eak
        </span>
      </span>
    </span>
  );
}
