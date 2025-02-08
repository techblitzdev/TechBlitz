import type React from 'react';

interface PremiumContentWrapperProps {
  children: React.ReactNode;
}

export default function PremiumContentWrapper({ children }: PremiumContentWrapperProps) {
  return (
    <div className="relative">
      {children}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 'calc(1 - var(--content-opacity))' }}
      />
    </div>
  );
}
