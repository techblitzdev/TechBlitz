'use client';

import NumberFlow from '@number-flow/react';

export default function GithubStars({ value }: { value: number }) {
  return <NumberFlow value={Number(value)} />;
}
