'use client';

import CountUp from 'react-countup';

export default function ErrorPageCountUp() {
  return <CountUp end={404} className="min-h-24 text-8xl font-semibold font-onest" duration={2} />;
}
